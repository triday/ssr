"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normal_name(name) {
    let res = name.replace(/[^0-9a-zA-Z]/g, '_');
    return /^[0-9]/.test(res) ? `_${res}` : res;
}
exports.normal_name = normal_name;
function getStrongValueType(value) {
    if (typeof value === "boolean") {
        return "boolean";
    }
    else if (typeof value === "string") {
        return "string";
    }
    else if (typeof value === "number") {
        return "number";
    }
    else if (Array.isArray(value)) {
        return `${getItemType(value)}[]`;
    }
    else {
        return "any";
    }
    function getItemType(valueArray) {
        if (valueArray.length === 0)
            return "any";
        let item0Type = getStrongValueType(valueArray[0]);
        for (let i = 1; i < valueArray.length; i++) {
            if (getStrongValueType(valueArray[i]) !== item0Type) {
                return "any";
            }
        }
        return item0Type;
    }
}
exports.getStrongValueType = getStrongValueType;
function getArguments(text) {
    let regex = /{([_a-zA-Z0-9]+)\s*(?:,\s*([\+-]?\d+)\s*)?(?::((?:(?:\\})|[^}])*))?}/g;
    let res = [];
    let tempR = regex.exec(text);
    while (tempR != null) {
        res.push(tempR[1]);
        tempR = regex.exec(text);
    }
    return res;
}
exports.getArguments = getArguments;
function getSingleLineRemarks(content, indent = 0) {
    return `${String.from(' ', indent)}/** ${content} */`;
}
exports.getSingleLineRemarks = getSingleLineRemarks;
function getMutilLineRemarks(content, indent = 0) {
    let indentSpaces = String.from(' ', indent);
    return;
    `${indentSpaces}/**
${indentSpaces}* ${content}
${indentSpaces}*/`;
}
exports.getMutilLineRemarks = getMutilLineRemarks;
//# sourceMappingURL=utils.js.map