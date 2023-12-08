interface DeprecatedIdParam {
    receiverType: string;
    method: string;
    paramIndex: number;
    wantParamType: string;
    asyncObjectFetch: string;
}
export declare const deprecatedIdParams: DeprecatedIdParam[];
interface DeprecatedSyncMethod {
    method: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const deprecatedSyncMethods: DeprecatedSyncMethod[];
interface DeprecatedSyncPropGetter {
    property: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const deprecatedSyncPropGetters: DeprecatedSyncPropGetter[];
interface DeprecatedSyncPropSetter {
    property: string;
    replacement: string;
    receiverTypes: string[];
}
export declare const deprecatedSyncPropSetters: DeprecatedSyncPropSetter[];
export {};
