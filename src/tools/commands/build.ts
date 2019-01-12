import BaseCommand from "./base";
import { getSrConfig } from "../Config";
import * as fs from "fs";
import * as path from "path";
import * as utils from "../Utils";
import * as log from "fancy-log";
import "colors";
class BuildCommand extends BaseCommand {
    run(args: string[]): void {
        let config = getSrConfig();
        copyResource(config.resBaseDir, config.targetBaseDir, config.moduleName,"i18n");
    }
}
export function copyResource(rootDir: string, targetDir: string, moduleName: string,rootNode:string): void {
    fs.readdir(rootDir, (err, files) => {
        files.forEach((p) => {
            let file = path.join(rootDir, p);
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                copyLocaleResource(file);
            }
        })
    });
    function getGroupKey(baseDir: string, filePath: string): string {
        let relativename = path.relative(baseDir, filePath);
        return utils.getGroupKey(utils.trimExt(relativename));
    }

    function copyLocaleResource(resourceDir: string) {
        try {
            let alljsonfile = utils.getAllJsonFiles(resourceDir);
            if (alljsonfile.length === 0) return;
            let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
            utils.mkdirsSync(targetlocaledir);
            
            let jsonContent = buildJsonContent(resourceDir, alljsonfile);
            let jsonFile =path.join(targetlocaledir, moduleName + '.json');
            utils.writeContentToFile(jsonContent, jsonFile);
            log.info(`Copy to "${jsonFile}" OK.`.green);
            let jsContent = buildJsContent(jsonContent, path.basename(resourceDir));
            let jsFile=path.join(targetlocaledir, moduleName + '.js');
            utils.writeContentToFile(jsContent, jsFile)
            log.info(`Copy to "${jsFile}" OK.`.green);
        } catch (error) {
            log.error(`Copy to target error:${error}.`.red);
        }
    }

    function buildJsonContent(baseDir: string, jsonFiles: string[]): string {
        let all: { [key: string]: any } = {};
        jsonFiles.forEach(p => {
            all[getGroupKey(baseDir, p)] = utils.getJsonFromFile(p);
        });
        return JSON.stringify(all);
    }
    function buildJsContent(allJson: string, locale: string): string {
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
});`
    }

}

export default new BuildCommand();