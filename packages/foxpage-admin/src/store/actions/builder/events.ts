import { createAction } from 'typesafe-actions';

import { DndData, PageContent, RenderStructureNode } from '@/types/index';

export const clearAll = createAction('BUILDER_EVENT__CLEAR_ALL', () => ({}))();

export const updateLoading = createAction('BUILDER_EVENT__UPDATE_LOADING', (loading: boolean) => ({
  loading,
}))();

export const updateComponent = createAction(
  'BUILDER_EVENT__UPDATE_COMPONENT',
  (params: RenderStructureNode, opt?: {}) => ({
    params,
    opt,
  }),
)();

export const forReRender = createAction(
  'BUILDER_EVENT__FPR_RERENDER',
  (pageContent: PageContent, oldPageContent?: PageContent) => ({
    pageContent,
    oldPageContent,
  }),
)();

export const removeComponent = createAction(
  'BUILDER_EVENT__REMOVE_COMPONENT',
  (params: RenderStructureNode) => ({
    params,
  }),
)();

export const copyComponent = createAction('BUILDER_EVENT__COPY_COMPONENT', (params: RenderStructureNode) => ({
  params,
}))();

export const dropComponent = createAction('BUILDER_EVENT__DROP_COMPONENT', (params: DndData) => ({
  params,
}))();

export const variableBind = createAction(
  'BUILDER_EVENT__VARIABLE_BIND',
  (keys: string, value?: string, opt?: { isMock: boolean }) => ({
    keys,
    value,
    opt,
  }),
)();

export const conditionBind = createAction('BUILDER_EVENT__CONDITION_BIND', (conditionIds: string[]) => ({
  conditionIds,
}))();
