import * as code from "../Constcode";
export function generate_ts(data: { [key: string]: any }): string {
    let lines: string[] = [];
    lines.push(generate_remarks());
    lines.push(generate_imports());
    lines.push(generate_class('test', 'test', data));
    lines.push(generate_exports('test'));
    return lines.join(code.LineSplitChar);
}
function generate_imports(): string {
    return `import S2Base from "${code.PackName}"`
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
    return `    public get groupKey(): string {
        return "${groupKey}";
    }`
}
function normal_name(name:string):string{
   let res= name.replace(/[^0-9a-zA-Z]/g,'_');
   return /^[0-9]/.test(res)?`_${res}`:res;
}
function generate_property(key: string, value: any): string {
    let prop_name = normal_name(key);
    let value_desc=String(value).toString();
    let jsdoc=`    /**
    * 查找类似 ${value_desc} 的本地化字符串。
    */`;

    let prop= `    public get ${prop_name}(): string {
        return this.getSRText("${key}");
    }`
    return [jsdoc,prop].join(code.LineSplitChar);
}

function generate_class(classname: string, groupkey: string, data: { [key: string]: any }): string {
    const group_lines = generate_groupkey(groupkey);
    const prop_lines = Object.keys(data).map(p => generate_property(p, data[p])).join(code.LineSplitChar);
    return `class ${classname} extends S2Base {
${group_lines}
${prop_lines}
}`

}