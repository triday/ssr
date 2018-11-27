import * as fs from "fs";
import * as path from "path";

export function getJsonFromFile(file: string): any {
    let alltext = fs.readFileSync(file, 'utf-8').trim();
    try {
        return JSON.parse(alltext || '{}');
    } catch (error) {
        throw new Error(`can not read json from file '${file}'`);
    }
}
export function writeJsonToFile(data: any, file: string, zip: boolean = true): void {
    if (zip) {
        writeContentToFile(JSON.stringify(data), file);
    } else {
        writeContentToFile(JSON.stringify(data, null, 4), file);
    }
}
export function writeContentToFile(content: string, file: string): void {
    mkdirsSync(path.dirname(file));
    fs.writeFileSync(file, content);
}
export function getAllJsonFiles(dir: string): string[] {
    let res: string[] = [];
    fs.existsSync(dir) && fs.readdirSync(dir).forEach((p) => {
        let file = path.join(dir, p);
        let stat = fs.statSync(file);
        if (stat.isFile() && isjsonfile(file)) {
            res.push(file);
        }
    });
    return res;
}
export function isjsonfile(file: string): boolean {
    return path.extname(file).toLowerCase() === '.json';
}
export function changeExt(file: string, newExt: string): string {
    if (newExt) {
        return `${trimExt(file)}.${newExt.replace(/^\.+/g, '')}`
    }
    return trimExt(file);

}
export function trimExt(file: string): string {
    let currentExt = path.extname(file);
    return currentExt.length > 0 ? file.slice(0, -currentExt.length) : file
}
export function getFullGroupKey(module: string, groupKey: string): string {
    return `${module}_${groupKey}`;

}
export function getGroupKey(path: string): string {
    return path.replace(/[\\/]/g, '.');
}
export function normalName(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
}
export function mkdirsSync(dirname: string): void {
    if (!fs.existsSync(dirname)) {
        mkdirsSync(path.dirname(dirname));
        fs.mkdirSync(dirname);
    }
}