interface DeprecatedSyncPropGetter {
  property: string
  replacement: string
  parentTypes: string[]
}

export const deprecatedSyncPropGetters: DeprecatedSyncPropGetter[] = [
  {
    property: 'instances',
    replacement: 'getInstancesAsync',
    parentTypes: ['ComponentNode'],
  },
  {
    property: 'consumers',
    replacement: 'getConsumersAsync',
    parentTypes: ['BaseStyle'],
  },
]

interface DeprecatedSyncPropSetter {
  property: string
  replacement: string
  parentTypes: string[]
}

export const deprecatedSyncPropSetters: DeprecatedSyncPropSetter[] = [
  {
    property: 'effectStyleId',
    replacement: 'setEffectStyleIdAsync',
    parentTypes: ['BlendMixin'],
  },
  {
    property: 'fillStyleId',
    replacement: 'setFillStyleIdAsync',
    parentTypes: ['MinimalFillsMixin'],
  },
  {
    property: 'gridStyleId',
    replacement: 'setGridStyleIdAsync',
    parentTypes: ['BaseFrameMixin'],
  },
  {
    property: 'strokeStyleId',
    replacement: 'setStrokeStyleIdAsync',
    parentTypes: ['MinimalStrokesMixin'],
  },
  {
    property: 'textStyleId',
    replacement: 'setTextStyleIdAsync',
    parentTypes: ['TextNode'],
  },
]

interface DeprecatedSyncMethod {
  method: string
  replacement: string
  parentTypes: string[]
}

export const deprecatedSyncMethods: DeprecatedSyncMethod[] = [
  {
    method: 'getNodeById',
    replacement: 'getNodeByIdAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getStyleById',
    replacement: 'getStyleById',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getFileThumbnailNode',
    replacement: 'getFileThumbnailNodeAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalTextStyles',
    replacement: 'getLocalTextStylesAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalPaintStyles',
    replacement: 'getLocalPaintStylesAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalEffectStyles',
    replacement: 'getLocalEffectStylesAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalGridStyles',
    replacement: 'getLocalGridStylesAsync',
    parentTypes: ['PluginAPI'],
  },
  {
    method: 'getVariableById',
    replacement: 'getVariableByIdAsync',
    parentTypes: ['VariablesAPI'],
  },
  {
    method: 'getVariableCollectionById',
    replacement: 'getVariableCollectionByIdAsync',
    parentTypes: ['VariablesAPI'],
  },
  {
    method: 'getLocalVariableCollections',
    replacement: 'getLocalVariableCollectionsAsync',
    parentTypes: ['VariablesAPI'],
  },
  {
    method: 'getLocalVariables',
    replacement: 'getLocalVariablesAsync',
    parentTypes: ['VariablesAPI'],
  },
]
