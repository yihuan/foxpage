import { message } from 'antd';
import _ from 'lodash';

import { loader } from '@foxpage/foxpage-js-sdk';
import { BrowserModule } from '@foxpage/foxpage-types';

import {
  Component,
  ComponentMap,
  ComponentResource,
  LoadedComponent,
  LoadedComponents,
  RenderStructureNode,
} from '@/types/index';

import { getFrameWin } from './common';

const loadedComponent: LoadedComponents = {};

/**
 * filter duplicates
 * @param {*} list structure list
 */
export const removeDuplicates = (list: RenderStructureNode[] = []) => {
  const keys: Array<string> = [];
  return list.filter((item) => {
    const { name, version } = item;
    const key = name + version;
    if (keys.indexOf(key) === -1) {
      keys.push(key);
      return item;
    }
    return null;
  });
};

/**
 * get structure list
 * @param structure structure
 * @returns list
 */
export const getStructureList = (structure: RenderStructureNode[] = []) => {
  let list: RenderStructureNode[] = [];
  structure.forEach((item) => {
    if (item.children && item.children.length > 0) {
      list = list.concat(getStructureList(item.children));
    }
    list.push({ ...item, children: [] });
  });
  return list;
};

export const initKey = (name: string, version?: string) => {
  return version ? `${name}@${version}` : name;
};

/**
 * node content
 * @param node
 * @returns
 */
const getContent = (node: RenderStructureNode, componentMap: ComponentMap) => {
  const key = initKey(node.name, node.version);
  return componentMap[key];
};

const findModule = (modules: BrowserModule[] = [], key: string) => {
  return modules.find((item) => item.name === key);
};

/**
 * update modules
 */
const updateModules = (
  modules: BrowserModule[],
  component: Component,
  componentResource: Component['resource'],
) => {
  const { entry, dependencies = [] } = componentResource || {};
  const { browser, css } = entry || {};

  if (!findModule(modules, initKey(component.name, component.version)) && browser) {
    const { path, host } = browser || {};
    const meta = _.cloneDeep(component.meta || {}) as BrowserModule['meta'];

    if (css) {
      const { path: cssPath, host: cssHost } = css;
      if (cssPath && cssHost) {
        meta.assets = [{ url: cssHost + cssPath }];
      }
    }

    if (host && path) {
      modules.push({
        name: component.name,
        version: component.version,
        url: host + path,
        meta,
        deps: dependencies.filter((item) => !!item.name).map((item) => item.name) || [],
      });
    }
  }
};

/**
 * update dependency modules
 * @param modules
 * @param dependencies {id, name}
 * @param componentMap
 */
const updateDependencyModules = (
  modules: BrowserModule[],
  dependencies: ComponentResource['dependencies'] = [],
  componentMap: ComponentMap,
) => {
  dependencies.forEach((item) => {
    const key = initKey(item.name, '');
    const content = componentMap[key];
    const componentResource = content?.resource;

    if (componentResource) {
      updateModules(modules, content, componentResource);

      if (componentResource.dependencies) {
        updateDependencyModules(modules, componentResource?.dependencies, componentMap);
      }
    }
  });
};

/**
 * init browser modules for loader
 * @param structures structure list
 * @param componentMap component map
 * @returns BrowserModule array
 */
const initModules = (structures: RenderStructureNode[], componentMap: ComponentMap): Array<BrowserModule> => {
  const modules: BrowserModule[] = [];

  structures.forEach((item) => {
    const content = getContent(item, componentMap);
    const componentResource = content?.resource;
    if (componentResource) {
      //browser
      updateModules(modules, content, componentResource);

      // dependencies
      if (componentResource.dependencies) {
        updateDependencyModules(modules, componentResource.dependencies, componentMap);
      }

      //editor
      const editorEntrySource = componentResource['editor-entry'];
      editorEntrySource?.forEach((editor) => {
        const editorContent = componentMap[initKey(editor.name, '')];
        const editorSource = editorContent?.resource;
        if (editorSource) {
          updateModules(modules, editorContent, editorSource);
        }
      });
    }
  });

  return modules;
};

const loadFramework = async () => {
  const win = getFrameWin();
  const frameworkResources = {
    requirejsLink: 'https://www.unpkg.com/requirejs@2.3.6/require.js',
    libs: {
      // 'react-helmet': {
      //   url: '', // umd url
      //   injectWindow: 'Helmet',
      //   umdModuleName: 'react-helmet',
      // },
    },
    win,
  };

  if (typeof win?.define === 'function') {
    win.define('react', window.React);
    win.define('react-dom', window.ReactDOM);
  }

  await loader.initFramework(frameworkResources);
};

/**
 * load component
 * @param structures  structures
 * @param componentMap  component map
 * @returns load result
 */
const load = async (structures: RenderStructureNode[] = [], componentMap: ComponentMap) => {
  const promise: Array<Promise<LoadedComponent>> = [];
  const keys: string[] = [];

  structures.forEach((node) => {
    const key = initKey(node.name, node.version);
    const component = componentMap[key];
    if (component) {
      if (!loadedComponent[key] && component.type !== 'systemComponent') {
        keys.push(node.name);
        promise.push(loader.loadComponent(node.name, node.version));
      }

      const editorEntry = component.resource?.['editor-entry'] || [];
      if (editorEntry.length > 0 && editorEntry[0].name) {
        const name = editorEntry[0].name;
        if (!loadedComponent[name]) {
          keys.push(editorEntry[0].name);
          promise.push(loader.loadComponent(editorEntry[0].name, ''));
        }
      }
    }
  });

  try {
    const componentResource = await Promise.all(promise);
    keys.forEach((key, index: number) => {
      loadedComponent[key] = componentResource[index];
    });
  } catch (e) {
    message.error(e + '');
  }

  return loadedComponent;
};

/**
 * to map components
 * @param components components
 * @returns mapped components
 */
export const mapComponent = (components: Component[] = []): ComponentMap => {
  const map = {};

  const toSet = (_map: ComponentMap = {}, item: Component) => {
    if (item.isLiveVersion || item.isLiveVersion === undefined) {
      // undefined is support old logic
      _map[item.name] = item;
    } else {
      _map[initKey(item.name, item.version)] = item;
    }
  };

  components.forEach((item) => {
    toSet(map, item);
    if (item.components) {
      item.components.forEach((depItem) => {
        toSet(map, depItem);
      });
    }
  });
  return map;
};

/**
 * load components
 * @param structures
 * @param componentMap
 * @returns loaded components
 */
export const loadComponents = async (
  structures: RenderStructureNode[],
  componentMap: ComponentMap,
  _opt: { locale?: string },
): Promise<LoadedComponents> => {
  const needLoadComponents = removeDuplicates(structures);

  await loadFramework();
  const modules = initModules(needLoadComponents, componentMap);

  loader.configComponent(modules);

  const result = await load(needLoadComponents, componentMap);
  return result;
};
