export declare const rules: unknown;
export declare const configs: unknown;
declare const plugin: {
    meta: {
        name: string;
        version: string;
    };
    rules: {
        [x: string]: unknown;
    };
};
export declare const flatConfigs: {
    recommended: {
        name: string;
        plugins: {
            '@figma/figma-plugins': {
                meta: {
                    name: string;
                    version: string;
                };
                rules: {
                    [x: string]: unknown;
                };
            };
        };
        rules: {
            [x: string]: string;
        };
    };
    'recommended-problems-only': {
        name: string;
        plugins: {
            '@figma/figma-plugins': {
                meta: {
                    name: string;
                    version: string;
                };
                rules: {
                    [x: string]: unknown;
                };
            };
        };
        rules: {
            [x: string]: string;
        };
    };
};
export default plugin;
