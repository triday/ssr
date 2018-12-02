import * as code from "../Constcode";
import "tsharp";
export function generate_ts(classname: string, groupkey: string, data: { [key: string]: any }): string {
    let lines: string[] = [];
    lines.push(generate_remarks());
    lines.push(generate_imports());
    lines.push(generate_class(classname, groupkey, data));
    lines.push(generate_exports(classname));
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
function normal_name(name: string): string {
    let res = name.replace(/[^0-9a-zA-Z]/g, '_');
    return /^[0-9]/.test(res) ? `_${res}` : res;
}
function generate_property(key: string, value: any): string {
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

    function getStrongValueType(value: any): string {
        if (typeof value === "boolean") {
            return "boolean";
        } else if (typeof value === "string") {
            return "string";
        } else if (typeof value === "number") {
            return "number";
        } else if (Array.isArray(value)) {
            return `${getItemType(value)}[]`;
        } else {
            return "any";
        }
    }
    function getItemType(valueArray: any[]): string {
        if (valueArray.length === 0) return "any";
        let item0Type = getStrongValueType(valueArray[0]);
        for (let i = 1; i < valueArray.length; i++) {
            if (getStrongValueType(valueArray[i]) !== item0Type) {
                return "any";
            }
        }
        return item0Type;
    }
    function getArguments(text: string): string[] {
        let regex = /{([_a-zA-Z0-9]+)\s*(?:,\s*([\+-]?\d+)\s*)?(?::((?:(?:\\})|[^}])*))?}/g
        let res: string[] = [];
        let tempR = regex.exec(text);
        while (tempR != null) {
            res.push(tempR[1]);
            tempR = regex.exec(text)
        }
        return res;


    }
    function generate_arguments_methods(args: string[]): string {
        let items = [
            generate_common_arguments_methods(),
        ]
        if (args.all(p => p.isNumber())) {
            var maxNum = args.select(p => parseInt(p)).max(p => p);
            if (maxNum <= 9) {
                items.push(gentrate_array_arguments_metods(maxNum));
            }
        } else if (args.all(p => p.isVarName())) {
            var allNames = args.distinct();
            if (allNames.length <= 9) {
                items.push(gentrate_object_arguments_metods(allNames));
            }
        }
        return items.join(code.LineSplitChar);
    }
    function generate_common_arguments_methods(): string {
        return `    public format_${prop_name}(args: any): string {
        return this.formatSRValueWithArgs("${key}", args);
    }`;
    }
    function gentrate_array_arguments_metods(max: number): string {
        let names = Array.range(0, max + 1).select(p => `arg${p}`);
        let args_text = names.select(p => `${p}: any`).join(', ');
        return `    public text(${args_text}): string {
        let args = [${names.join(', ')}];
        return this.format_${prop_name}(args);
    }`
    }
    function gentrate_object_arguments_metods(names: string[]): string {
        return ''
    }
    function generate_other_property(is_string: boolean, value_type: string, value_desc: string): string {
        let otherValueDoc = `查找键为'${key}'的本地化内容。`;
        let stringValueDoc = `查找键为'${key}'，类似 ${value_desc} 的本地化字符串。`;
        let jsdoc = `    /**
    * ${is_string ? stringValueDoc : otherValueDoc}
    */`;
        let prop = `    public get ${prop_name}(): ${value_type} {
        return this.getSRValue("${key}");
    }`
        return [jsdoc, prop].join(code.LineSplitChar);
    }
}


function generate_class(classname: string, groupkey: string, data: { [key: string]: any }): string {
    const group_lines = generate_groupkey(groupkey);
    const prop_lines = Object.keys(data).map(p => generate_property(p, data[p])).join(code.LineSplitChar);
    return `class ${classname} extends S2Base {
${group_lines}
${prop_lines}
}`

}