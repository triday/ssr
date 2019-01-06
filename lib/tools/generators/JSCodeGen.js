"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code = require("../Constcode");
const utils_1 = require("./utils");
function generate_js(classname, groupkey, data) {
    let lines = [];
    lines.push(generate_prepare());
    lines.push(generate_remarks());
    lines.push(generate_imports());
    lines.push(generate_key_class(classname, data));
    lines.push(generate_class(classname, groupkey, data));
    lines.push(generate_exports(classname));
    return lines.join(code.LineSplitChar);
}
exports.generate_js = generate_js;
function generate_prepare() {
    return `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });`;
}
function generate_imports() {
    return `const ${code.PackName} = require("${code.PackName}");`;
}
function generate_remarks() {
    return `/*
${code.StrongTypeDocs}
*/`;
}
function generate_exports(classname) {
    return `export default new ${classname}();`;
}
function generate_groupkey(groupKey) {
    return `    get groupKey() {
        return "${groupKey}";
    }`;
}
function generate_property(className, key, value) {
    let prop_name = utils_1.normal_name(key);
    let value_desc = String(value).toString().truncat(100);
    let is_string = typeof value === "string";
    let args = is_string ? utils_1.getArguments(value) : [];
    if (args.length > 0) {
        return generate_arguments_methods(args);
    }
    else {
        return generate_other_property(is_string, value_desc);
    }
    function generate_arguments_methods(args) {
        if (args.all(p => p.isNumber())) {
            var maxNum = args.select(p => parseInt(p)).max(p => p);
            if (maxNum <= 9) {
                return gentrate_array_arguments_metods(maxNum);
            }
        }
        else if (args.all(p => p.isVarName())) {
            var allNames = args.distinct();
            if (allNames.length <= 9) {
                return gentrate_object_arguments_metods(allNames);
            }
        }
        return gentrate_common_arguments_metods();
    }
    function gentrate_common_arguments_metods() {
        let jsdoc = generate_jsdoc(is_string, value_desc, true);
        let medhod_desc = `    ${prop_name}(args) {
        return this.formatSRValue(${className}Keys.${prop_name}, args);
    }`;
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function gentrate_array_arguments_metods(max) {
        let names = Array.range(0, max + 1).select(p => `arg${p}`);
        let args_text = names.join(', ');
        let jsdoc = generate_jsdoc(is_string, value_desc, true);
        let medhod_desc = `    ${prop_name}(${args_text}) {
        let args = [${names.join(', ')}];
        return this.formatSRValue(${className}Keys.${prop_name}, args);
    }`;
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function gentrate_object_arguments_metods(names) {
        let args_text = names.join(', ');
        let join_text = `,${code.LineSplitChar}${String.from(' ', 12)}`;
        let jsdoc = generate_jsdoc(is_string, value_desc, true);
        let args_object_body = names.select(p => `${p}: ${p}`).join(join_text);
        let medhod_desc = `    ${prop_name}(${args_text}) {
        let args = {
            ${args_object_body}
        };
        return this.formatSRValue(${className}Keys.${prop_name}, args);
    }`;
        return [jsdoc, medhod_desc].join(code.LineSplitChar);
    }
    function generate_other_property(is_string, value_desc) {
        let jsdoc = generate_jsdoc(is_string, value_desc, false);
        let prop_desc = `    get ${prop_name}() {
        return this.getSRValue(${className}Keys.${prop_name});
    }`;
        return [jsdoc, prop_desc].join(code.LineSplitChar);
    }
    function generate_jsdoc(is_string, value_desc, is_format = false) {
        let otherValueDoc = `获取键为 ${key} 的本地化内容。`;
        let stringValueDoc = `获取键为 ${key} ，类似 ${value_desc} 的本地${is_format ? "格式化" : "化"}字符串。`;
        let jsdoc = `    /**
    * ${is_string ? stringValueDoc : otherValueDoc}
    */`;
        return jsdoc;
    }
}
function generate_class(classname, groupkey, data) {
    const group_lines = generate_groupkey(groupkey);
    const prop_lines = Object.keys(data).map(p => generate_property(classname, p, data[p])).join(code.LineSplitChar);
    return `class ${classname} extends ${code.PackName}.default {
${group_lines}
${prop_lines}
}`;
}
function generate_key_class(classname, data) {
    let static_prop_lines = Object.keys(data).select(p => {
        return `/** 获取名称为 ${p} 的键。 */
${classname}Keys.${utils_1.normal_name(p)} = "${p}";`;
    }).join(code.LineSplitChar);
    let join_text2 = `,${code.LineSplitChar}`;
    let all_prop_lines = Object.keys(data).select(p => `    "${p}"`).join(join_text2);
    return `class ${classname}Keys {
}
${static_prop_lines}
/** 获取所有的键的名称。 */
${classname}Keys.ALL = [
${all_prop_lines}
];`;
}
//# sourceMappingURL=JSCodeGen.js.map