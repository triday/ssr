import * as fs from "fs";
import * as path from "path";
import * as code from "./Constcode";
import * as utils from "./Utils";
class SrConfig {
    moduleName: string;
    resBaseDir: string;
    codeBaseDir: string;
    codeType: string;
    fromLocale: string;
    targetBaseDir: string;
}
const DEFAULT_CONFIG = {
    resBaseDir: "./src/i18n",
    codeBaseDir: "./src/i18n",
    codeType: "ts",
    fromLocale: "zh-CN",
    targetBaseDir: "i18n",
}
function getPackageJsonFile(currentDir: string): string {
    currentDir = path.resolve(currentDir);
    while (true) {
        let testFile = path.join(currentDir, code.PackageJsonName);
        if (fs.existsSync(testFile)) {
            return testFile;
        } else {
            let parentDir = path.dirname(currentDir);
            if (parentDir === currentDir) {
                break;
            } else {
                currentDir = parentDir;
            }
        }
    }
    return ''
}
export function getSrConfig(): SrConfig {
    let packJsonFile = getPackageJsonFile('.');
    if (packJsonFile === '') throw new Error(`can not find '${code.PackageJsonName}' file.`)
    let packJson = utils.getJsonFromFile(packJsonFile);
    return Object.assign({moduleName:packJson.name},DEFAULT_CONFIG,packJson.sr) as SrConfig;
}