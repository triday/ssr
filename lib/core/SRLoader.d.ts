import "tsharp";
export interface ISRLoader {
    loadGroups(module: string, locale: string): Promise<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
}
export declare class RestS2Loader implements ISRLoader {
    prefiex: string;
    moduleUrlFormat: string;
    constructor(prefiex?: string, moduleUrlFormat?: string);
    static Default: RestS2Loader;
    loadGroups(module: string, locale: string): Promise<{
        [key: string]: {
            [key: string]: any;
        };
    }>;
}
