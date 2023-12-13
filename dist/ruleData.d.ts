interface DynamicPageBannedIdParam {
    receiverType: string;
    method: string;
    paramIndex: number;
    wantParamType: string;
    asyncObjectFetch: string;
}
export declare const dynamicPageBannedIdParams: DynamicPageBannedIdParam[];
interface DynamicPageBannedSyncMethod {
    method: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const dynamicPageBannedSyncMethods: DynamicPageBannedSyncMethod[];
interface DynamicPageBannedSyncPropGetter {
    property: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const dynamicPageBannedSyncPropGetters: DynamicPageBannedSyncPropGetter[];
interface DynamicPageBannedSyncPropSetter {
    property: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const dynamicPageBannedSyncPropSetters: DynamicPageBannedSyncPropSetter[];
export {};
