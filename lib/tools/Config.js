"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const code = require("./Constcode");
const utils = require("./Utils");
class SrConfig {
}
exports.SrConfig = SrConfig;
const DEFAULT_CONFIG = {
    resBaseDir: "src/i18n",
    codeBaseDir: "src/i18n",
    codeType: "ts",
    fromLocale: "zh-CN",
    targetBaseDir: "dist/i18n",
};
function getPackageJsonFile(currentDir) {
    currentDir = path.resolve(currentDir);
    while (true) {
        let testFile = path.join(currentDir, code.PackageJsonName);
        if (fs.existsSync(testFile)) {
            return testFile;
        }
        else {
            let parentDir = path.dirname(currentDir);
            if (parentDir === currentDir) {
                break;
            }
            else {
                currentDir = parentDir;
            }
        }
    }
    return '';
}
function getSrConfig() {
    let packJsonFile = getPackageJsonFile('.');
    if (packJsonFile === '')
        throw new Error(`can not find '${code.PackageJsonName}' file.`);
    let packJson = utils.getJsonFromFile(packJsonFile);
    return Object.assign({ moduleName: packJson.name }, DEFAULT_CONFIG, packJson.sr);
}
exports.getSrConfig = getSrConfig;
//# sourceMappingURL=Config.js.map