interface DeprecatedIdParam {
  receiverType: string
  method: string
  paramIndex: number
  wantParamType: string
  asyncObjectFetch: string
}

export const deprecatedIdParams: DeprecatedIdParam[] = [
  {
    receiverType: 'VariablesAPI',
    method: 'createVariable',
    paramIndex: 1,
    wantParamType: 'VariableCollection',
    asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
  },
]

interface DeprecatedSyncMethod {
  method: string
  replacement: string
  receiverTypes: string[]
}

export const deprecatedSyncMethods: DeprecatedSyncMethod[] = [
  {
    method: 'getNodeById',
    replacement: 'getNodeByIdAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getStyleById',
    replacement: 'getStyleById',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getFileThumbnailNode',
    replacement: 'getFileThumbnailNodeAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalTextStyles',
    replacement: 'getLocalTextStylesAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalPaintStyles',
    replacement: 'getLocalPaintStylesAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalEffectStyles',
    replacement: 'getLocalEffectStylesAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getLocalGridStyles',
    replacement: 'getLocalGridStylesAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    method: 'getVariableById',
    replacement: 'getVariableByIdAsync',
    receiverTypes: ['VariablesAPI'],
  },
  {
    method: 'getVariableCollectionById',
    replacement: 'getVariableCollectionByIdAsync',
    receiverTypes: ['VariablesAPI'],
  },
  {
    method: 'getLocalVariableCollections',
    replacement: 'getLocalVariableCollectionsAsync',
    receiverTypes: ['VariablesAPI'],
  },
  {
    method: 'getLocalVariables',
    replacement: 'getLocalVariablesAsync',
    receiverTypes: ['VariablesAPI'],
  },
  {
    method: 'setRangeTextStyle',
    replacement: 'setRangeTextStyleIdAsync',
    receiverTypes: ['NonResizableTextMixin'],
  },
  {
    method: 'setRangeFillStyle',
    replacement: 'setRangeFillStyleIdAsync',
    receiverTypes: ['NonResizableTextMixin'],
  },
]

interface DeprecatedSyncPropGetter {
  property: string
  replacement: string
  receiverTypes: string[]
}

export const deprecatedSyncPropGetters: DeprecatedSyncPropGetter[] = [
  {
    property: 'instances',
    replacement: 'getInstancesAsync',
    receiverTypes: ['ComponentNode'],
  },
  {
    property: 'consumers',
    replacement: 'getConsumersAsync',
    receiverTypes: ['BaseStyle'],
  },
  {
    property: 'mainComponent',
    replacement: 'getMainComponentAsync',
    receiverTypes: ['InstanceNode'],
  },
]

interface DeprecatedSyncPropSetter {
  property: string
  replacement: string
  receiverTypes: string[]
}

export const deprecatedSyncPropSetters: DeprecatedSyncPropSetter[] = [
  {
    property: 'currentPage',
    replacement: 'setCurrentPageAsync',
    receiverTypes: ['PluginAPI'],
  },
  {
    property: 'effectStyleId',
    replacement: 'setEffectStyleIdAsync',
    receiverTypes: ['BlendMixin'],
  },
  {
    property: 'fillStyleId',
    replacement: 'setFillStyleIdAsync',
    receiverTypes: ['MinimalFillsMixin'],
  },
  {
    property: 'gridStyleId',
    replacement: 'setGridStyleIdAsync',
    receiverTypes: ['BaseFrameMixin'],
  },
  {
    property: 'strokeStyleId',
    replacement: 'setStrokeStyleIdAsync',
    receiverTypes: ['MinimalStrokesMixin'],
  },
  {
    property: 'textStyleId',
    replacement: 'setTextStyleIdAsync',
    receiverTypes: ['TextNode'],
  },
  {
    property: 'backgroundStyleId',
    replacement: 'setFillStyleIdAsync',
    receiverTypes: ['DeprecatedBackgroundMixin'],
  },
]
