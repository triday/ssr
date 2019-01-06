"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const Config_1 = require("../Config");
const fs = require("fs");
const path = require("path");
const utils = require("../Utils");
const log = require("fancy-log");
require("colors");
class CopyCommand extends base_1.default {
    run(args) {
        let config = Config_1.getSrConfig();
        copyResource(config.resBaseDir, config.targetBaseDir, config.moduleName, config.targetBaseDir);
    }
}
function copyResource(rootDir, targetDir, moduleName, rootNode) {
    fs.readdir(rootDir, (err, files) => {
        files.forEach((p) => {
            let file = path.join(rootDir, p);
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                copyLocaleResource(file);
            }
        });
    });
    function getGroupKey(baseDir, filePath) {
        let relativename = path.relative(baseDir, filePath);
        return utils.getGroupKey(utils.trimExt(relativename));
    }
    function copyLocaleResource(resourceDir) {
        try {
            let alljsonfile = utils.getAllJsonFiles(resourceDir);
            if (alljsonfile.length === 0)
                return;
            let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
            utils.mkdirsSync(targetlocaledir);
            let jsonContent = buildJsonContent(resourceDir, alljsonfile);
            let jsonFile = path.join(targetlocaledir, moduleName + '.json');
            utils.writeContentToFile(jsonContent, jsonFile);
            log.info(`Copy to "${jsonFile}" OK.`.green);
            let jsContent = buildJsContent(jsonContent, path.basename(resourceDir));
            let jsFile = path.join(targetlocaledir, moduleName + '.js');
            utils.writeContentToFile(jsContent, jsFile);
            log.info(`Copy to "${jsFile}" OK.`.green);
        }
        catch (error) {
            log.error(`Copy to target error:${error}.`.red);
        }
    }
    function buildJsonContent(baseDir, jsonFiles) {
        let all = {};
        jsonFiles.forEach(p => {
            all[getGroupKey(baseDir, p)] = utils.getJsonFromFile(p);
        });
        return JSON.stringify(all);
    }
    function buildJsContent(allJson, locale) {
        return `(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root['${rootNode}'] = root['${rootNode}'] || {};
        root['${rootNode}']['${locale}'] = root['${rootNode}']['${locale}'] || {};
        root['${rootNode}']['${locale}']['${moduleName}'] = factory();
    }
})(this, function () {
    return ${allJson};
});`;
    }
}
exports.copyResource = copyResource;
exports.default = new CopyCommand();
//# sourceMappingURL=copy.js.map