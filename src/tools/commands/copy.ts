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
        copyResource(config.resBaseDir, targetDir, config.moduleName, true, true);
    }
}
export function copyResource(rootDir: string, targetDir: string, moduleName: string, mergeAll: boolean = true, zip: boolean = true): void {
    fs.readdir(rootDir, (err, files) => {
        files.forEach((p) => {
            let file = path.join(rootDir, p);
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                copyLocaleResource(file)
            }
        })
    });
    function getFullGroupKey(baseDir: string, filePath: string): string {
        return utils.getFullGroupKey(moduleName, getGroupKey(baseDir, filePath));
    }
    function getGroupKey(baseDir: string, filePath: string): string {
        let relativename = path.relative(baseDir, filePath);
        return utils.getGroupKey(utils.trimExt(relativename));
    }

    function copyLocaleResource(resourceDir: string) {
        let alljsonfile = utils.getAllJsonFiles(resourceDir);
        if (alljsonfile.length === 0) return;
        let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
        utils.mkdirsSync(targetlocaledir)
        alljsonfile.forEach(p => {
            let groupfileName = getFullGroupKey(resourceDir, p) + ".json";
            let content = utils.getJsonFromFile(p);
            utils.writeJsonToFile(content, path.join(targetlocaledir, groupfileName));
        });
        if (mergeAll) {
            mergeJsonFiles(resourceDir, alljsonfile, path.join(targetlocaledir, moduleName + '.json'));
        }
    }
    function mergeJsonFiles(baseDir: string, jsonFiles: string[], targetFile: string): void {
        let all: { [key: string]: any } = {};
        jsonFiles.forEach(p => {
            all[getGroupKey(baseDir, p)] = utils.getJsonFromFile(p);
        });
        utils.writeJsonToFile(all, targetFile);
    }
}

export default new CopyCommand();