import * as code from "../Constcode";
export function generate_js(classname: string, groupkey: string, data: { [key: string]: any }): string {
    let lines: string[] = [];
    lines.push(generate_prepare());
    lines.push(generate_remarks());
    lines.push(generate_imports());
    lines.push(generate_class(classname, groupkey, data));
    lines.push(generate_exports(classname));
    return lines.join(code.LineSplitChar);
}
function generate_prepare(): string {
    return `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });`
}
function generate_imports(): string {
    return `const ${code.PackName} = require("${code.PackName}");`
}
function generate_remarks(): string {
    return `/*
${code.StrongTypeDocs}
*/`
}
function generate_exports(classname: string): string {
    return `export default new ${classname}();`
}
function generate_groupkey(groupKey: string): string {
    return `    get groupKey() {
        return "${groupKey}";
    }`
}
function normal_name(name: string): string {
    let res = name.replace(/[^0-9a-zA-Z]/g, '_');
    return /^[0-9]/.test(res) ? `_${res}` : res;
}
function generate_property(key: string, value: any): string {
    let prop_name = normal_name(key);
    let value_desc = String(value).toString();
    let jsdoc = `    /**
    * 查找类似 ${value_desc} 的本地化字符串。
    */`;

    let prop = `    get ${prop_name}() {
        return this.getSRText("${key}");
    }`
    return [jsdoc, prop].join(code.LineSplitChar);
}

function generate_class(classname: string, groupkey: string, data: { [key: string]: any }): string {
    const group_lines = generate_groupkey(groupkey);
    const prop_lines = Object.keys(data).map(p => generate_property(p, data[p])).join(code.LineSplitChar);
    return `class ${classname} extends ${code.PackName}.default {
${group_lines}
${prop_lines}
}`

}