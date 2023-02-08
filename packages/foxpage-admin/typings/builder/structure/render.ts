import { Component } from '@/types/component';

import { StructureNode } from './main';

/**
 * render structure node
 */
export interface RenderStructureNode extends StructureNode {
  // inherit
  children?: RenderStructureNode[];

  // extensions
  __styleNode?: StructureNode | null;
  __renderProps: StructureNode['props'];
  __mock?: RenderStructureNode;
  __lastModified?: number; // for record node update time 
  __editorConfig?: {
    visible?: boolean; // eye status
    showInStructure?: boolean; // status in structure
    directiveable?: boolean;
    moveable?: boolean;
    editable?: boolean;
    styleable?: boolean;
    isExtend?: boolean;
    isExtendAndModified?: boolean;
    isExtendAndDeleted?: boolean;
    hasCondition?: boolean;
    hasVariable?: boolean;
    hasMock?: boolean;
    // rootNode
    templateBind?: boolean;
    disableTemplateBind?: boolean;
  };
  __versions?: Component[]
}

export type RenderStructure = RenderStructureNode[];
