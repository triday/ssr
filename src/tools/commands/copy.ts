import BaseCommand from "./base";
import { getSrConfig } from "../Config";
import * as fs from "fs";
import * as path from "path";
import * as utils from "../Utils";
class CopyCommand extends BaseCommand {
    run(args: string[]): void {
        if (args.length != 1) return;
        let config = getSrConfig();
        let targetDir = path.join(args[0], config.targetBaseDir);
        copyResource(config.resBaseDir, targetDir, config.moduleName,config.targetBaseDir);
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
        let alljsonfile = utils.getAllJsonFiles(resourceDir);
        if (alljsonfile.length === 0) return;
        let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
        utils.mkdirsSync(targetlocaledir);

        let jsonContent = buildJsonContent(resourceDir, alljsonfile);
        utils.writeContentToFile(jsonContent, path.join(targetlocaledir, moduleName + '.json'));

        let jsContent = buildJsContent(jsonContent, path.basename(resourceDir));
        utils.writeContentToFile(jsContent, path.join(targetlocaledir, moduleName + '.js'))
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

export default new CopyCommand();