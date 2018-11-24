import * as fs from "fs"
import * as path from "path";



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
        let alljsonfile = getAllJsonFiles(resourceDir);
        if (alljsonfile.length === 0) return;
        let targetlocaledir = path.join(targetDir, path.basename(resourceDir));
        if (!fs.existsSync(targetlocaledir))
            fs.mkdirSync(targetlocaledir);
        alljsonfile.forEach(p => {
            let groupfileName = getGroupFileName(resourceDir, p);
            let content=getJsonFromFile(p);
            writeJsonToFile(content,path.join(targetlocaledir, groupfileName));
        });
        if (mergeAll) {
            mergeJsonFiles(resourceDir, alljsonfile, path.join(targetlocaledir, moduleName + '.json'));
        }
    }
    function mergeJsonFiles(baseDir: string, jsonFiles: string[], targetFile: string): void {
        let all: { [key: string]: any } = {};
        jsonFiles.forEach(p => {
            all[getGroupKey(baseDir, p)] = getJsonFromFile(p);
        });
        writeJsonToFile(all,targetFile);
    }
    function getJsonFromFile(file: string): any {
        let alltext = fs.readFileSync(file, 'utf-8').trim();
        try {
            return JSON.parse(alltext || '{}');
        } catch (error) {
            throw new Error(`can not read json from file '${file}'`);
        }
    }
    function writeJsonToFile(data:any,file:string):void{
        if(zip){
            fs.writeFileSync(file, JSON.stringify(data));
        }else{
            fs.writeFileSync(file, JSON.stringify(data,null,4));
        }
    }
    function getAllJsonFiles(dir: string): string[] {
        let res: string[] = [];
        fs.readdirSync(dir).forEach((p) => {
            let file = path.join(dir, p);
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                res.push(...getAllJsonFiles(file));
            } else if (isjsonfile(file)) {
                res.push(file);
            }
        });
        return res;
    }
    function isjsonfile(file: string): boolean {
        return path.extname(file).toLowerCase() === '.json';
    }
}
