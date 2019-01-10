import * as code from "../Constcode";
import "tsharp";
import { normal_name, getStrongValueType, getArguments } from "./utils";


export function generate_ts(classname: string, groupkey: string, data: { [key: string]: any }): string {
    let lines: string[] = [];
    lines.push(generate_remarks());
    lines.push(generate_imports());
    lines.push(generate_key_class(classname, data));
    lines.push(generate_class(classname, groupkey, data));
    lines.push(generate_default_exports(classname));
    return lines.join(code.LineSplitChar);
}
function generate_remarks(): string {
    return `/*
${code.StrongTypeDocs}
*/`
}
function generate_imports(): string {
    return `import {SRBase} from "${code.PackName}";`
}
function generate_key_class(classname: string, data: { [key: string]: any }): string {
    let join_text = `${code.LineSplitChar}${String.from(' ', 4)}`;
    let static_prop_lines = Object.keys(data).select(p => {
        return `/** 获取名称为 ${p} 的键。 */
    public static ${normal_name(p)} = "${p}";`
    }).join(join_text);
    let join_text2 = `,${code.LineSplitChar}${String.from(' ', 8)}`;
    let all_prop_lines = Object.keys(data).select(p => `"${p}"`).join(join_text2);
    return `export class ${classname}Keys {
    ${static_prop_lines}
    /** 获取所有的键的名称。 */
    public static ALL: string[] = [
        ${all_prop_lines}
    ];
}`
}


function generate_default_exports(classname: string): string {
    return `export default new ${classname}();`
}
function generate_groupkey(groupKey: string): string {
    return `    public get groupKey(): string {
        return "${groupKey}";
    }`
}
function generate_allKeys(classname: string): string {
    return `    public get allKeys(): string[] {
        return ${classname}Keys.ALL;
    }`
}
function generate_property(className: string, key: string, value: any): string {
    let prop_name = normal_name(key);
    let value_desc = String(value).toString().truncat(100);
    let value_type = getStrongValueType(value);
    let is_string = value_type === "string";
    let args = is_string ? getArguments(value) : [];
    if (args.length > 0) {
        return generate_arguments_methods(args);
    } else {
        return generate_other_property(is_string, value_type, value_desc);
    }




    function generate_arguments_methods(args: string[]): string {
        if (args.all(p => p.isNumber())) {
            var maxNum = args.select(p => parseInt(p)).max(p => p);
            if (maxNum <= 9) {
                return gentrate_array_arguments_metods(maxNum);
            }
        } else if (args.all(p => p.isVarName())) {
            var allNames = args.distinct();
            if (allNames.length <= 9) {
                return gentrate_object_arguments_metods(allNames);
            }
        }
        return gentrate_common_arguments_metods();
    }
    function gentrate_common_arguments_metods(): string {
        let jsdoc = generate_jsdoc(is_string, value_type, value_desc, true);
        let medhod_desc = `    public ${prop_name}(...args: any): string {
        return this.formatSRValue(${className}Keys.${prop_name}, ...args);
    }`
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function gentrate_array_arguments_metods(max: number): string {
        let names = Array.range(0, max + 1).select(p => `arg${p}`);
        let args_text = names.select(p => `${p}: any`).join(', ');
        let jsdoc = generate_jsdoc(is_string, value_type, value_desc, true);
        let medhod_desc = `    public ${prop_name}(${args_text}): string {
        let args = [${names.join(', ')}];
        return this.formatSRValue(${className}Keys.${prop_name}, ...args);
    }`
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function gentrate_object_arguments_metods(names: string[]): string {
        let args_text = names.select(p => `${p}: any`).join(', ');
        let join_text = `,${code.LineSplitChar}${String.from(' ', 12)}`;
        let jsdoc = generate_jsdoc(is_string, value_type, value_desc, true);
        let args_object_body = names.select(p => `${p}: ${p}`).join(join_text);
        let medhod_desc = `    public ${prop_name}(${args_text}): string {
        let args = {
            ${args_object_body}
        };
        return this.formatSRValue(${className}Keys.${prop_name}, args);
    }`
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function generate_other_property(is_string: boolean, value_type: string, value_desc: string): string {
        let jsdoc = generate_jsdoc(is_string, value_type, value_desc, false);
        let prop_desc = `    public get ${prop_name}(): ${value_type} {
        return this.getSRValue(${className}Keys.${prop_name});
    }`
        return [jsdoc, prop_desc].join(code.LineSplitChar);
    }
    function generate_jsdoc(is_string: boolean, value_type: string, value_desc: string, is_format: boolean = false): string {
        let otherValueDoc = `获取键为 ${key} 的本地化内容。`;
        let stringValueDoc = `获取键为 ${key} ，类似 ${value_desc} 的本地${is_format ? "格式化" : "化"}字符串。`;
        let jsdoc = `    /**
    * ${is_string ? stringValueDoc : otherValueDoc}
    */`;
        return jsdoc;
    }
}

function generate_class(classname: string, groupkey: string, data: { [key: string]: any }): string {
    const group_lines = generate_groupkey(groupkey);
    const allKey_lines = generate_allKeys(classname);
    const prop_lines = Object.keys(data).map(p => generate_property(classname, p, data[p])).join(code.LineSplitChar);
    return `export class ${classname} extends SRBase {
${group_lines}
${allKey_lines}
${prop_lines}
}`

}