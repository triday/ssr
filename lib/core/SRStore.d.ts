export interface ISRStore {
    getGroup(groupKey: string, localeCode: string): {
        [key: string]: any;
    };
    hasModule(moduleName: string, localeCode: string): boolean;
    saveModule(moduleName: string, localeCode: string, datas: {
        [key: string]: {
            [key: string]: any;
        };
    }): void;
    removeModule(moduleName: string, localeCode: string): void;
    clearLocale(localeCode: string): void;
    clearAll(): void;
}
export declare class MemoryStore implements ISRStore {
    host: any;
    rootKey: string;
    static Default: ISRStore;
    rootObject: any;
    constructor(host?: any, rootKey?: string);
    removeModule(moduleName: string, localeCode: string): void;
    saveModule(moduleName: string, localeCode: string, datas: {
        [key: string]: {
            [key: string]: any;
        };
    }): void;
    hasModule(moduleName: string, localeCode: string): boolean;
    getGroup(groupKey: string, localeCode: string): {
        [key: string]: string;
    };
    clearLocale(localeCode: string): void;
    clearAll(): void;
    private getModuleNameFromGroupKey;
}
