import * as fs from "fs";
import * as path from "path";
import * as utils from "./Utils";


function copyResource(rootDir: string, targetDir: string, moduleName: string, mergeAll: boolean = true, zip: boolean = true): void {
    fs.readdir(rootDir, (err, files) => {
        files.forEach((p) => {
            let file = path.join(rootDir, p);
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                copyLocaleResource(file)
            }
        })
    });
    function getGroupFileName(baseDir: string, filePath: string): string {
        let relativename = path.relative(baseDir, filePath);
        return [moduleName, ...relativename.split(path.sep)].join('.');
    }
    function getGroupKey(baseDir: string, filePath: string): string {
        let fileName = getGroupFileName(baseDir, filePath);
        return fileName.slice(0, -path.extname(fileName).length)
    }
    function copyLocaleResource(resourceDir: string) {
        let alljsonfile = utils.getAllJsonFiles(resourceDir);
        if (alljsonfile.length === 0) return;
        let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
        if (!fs.existsSync(targetlocaledir))
            fs.mkdirSync(targetlocaledir);
        alljsonfile.forEach(p => {
            let groupfileName = getGroupFileName(resourceDir, p);
            let content=utils.getJsonFromFile(p);
            utils.writeJsonToFile(content,path.join(targetlocaledir, groupfileName));
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
        utils.writeJsonToFile(all,targetFile);
    }
}
