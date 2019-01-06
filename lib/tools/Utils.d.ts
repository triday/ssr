export declare function getJsonFromFile(file: string): any;
export declare function writeJsonToFile(data: any, file: string, zip?: boolean): void;
export declare function writeContentToFile(content: string, file: string): void;
export declare function getAllJsonFiles(dir: string): string[];
export declare function isjsonfile(file: string): boolean;
export declare function changeExt(file: string, newExt: string): string;
export declare function trimExt(file: string): string;
export declare function getFullGroupKey(module: string, groupKey: string): string;
export declare function getGroupKey(path: string): string;
export declare function normalName(name: string): string;
export declare function mkdirsSync(dirname: string): void;