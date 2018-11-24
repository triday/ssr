import * as fs from "fs";
import * as path from "path";
import { generate_ts } from "./generators/TSCodeGen"
const [node, filepath, ...argv] = process.argv;

function main(argv: string[]): void {
    if (argv.length > 0) {
        const dirname = path.dirname(argv[0]);
        const filename = path.basename(argv[0]);
        const extname = path.extname(argv[0]);
        const out_file = path.join(dirname, 'aaabbb.ts');
        readFile(argv[0])
            .then(genCode)
            .then((content)=>{writeFile(out_file,content)});
    }
}
function readFile(file: string): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data))
        });
    });
}
function writeFile(file: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, (err) => {
            if (err) reject(err);
            else resolve();
        })
    });
}
function genCode(datas: { [key: string]: any }): Promise<string> {
    return Promise.resolve(generate_ts(datas));
}
main(argv);