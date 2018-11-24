import * as fs from "fs";

export function getJsonFromFile(file: string): any {
    let alltext = fs.readFileSync(file, 'utf-8').trim();
    try {
        return JSON.parse(alltext || '{}');
    } catch (error) {
        throw new Error(`can not read json from file '${file}'`);
    }
}
export function writeJsonToFile(data: any, file: string, zip: boolean): void {
    if (zip) {
        fs.writeFileSync(file, JSON.stringify(data));
    } else {
        fs.writeFileSync(file, JSON.stringify(data, null, 4));
    }
}