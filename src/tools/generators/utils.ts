export function normal_name(name: string): string {
    let res = name.replace(/[^0-9a-zA-Z]/g, '_');
    return /^[0-9]/.test(res) ? `_${res}` : res;
}
export function getStrongValueType(value: any): string {
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
}
export function getArguments(text: string): string[] {
    let regex = /{([_a-zA-Z0-9]+)\s*(?:,\s*([\+-]?\d+)\s*)?(?::((?:(?:\\})|[^}])*))?}/g
    let res: string[] = [];
    let tempR = regex.exec(text);
    while (tempR != null) {
        res.push(tempR[1]);
        tempR = regex.exec(text)
    }
    return res;
}
export function getSingleLineRemarks(content: string, indent: number = 0): string {
    return `${String.from(' ', indent)}/** ${content} */`;
}
export function getMutilLineRemarks(content: string, indent: number = 0):string{
    let indentSpaces=String.from(' ',indent);
    return 
`${indentSpaces}/**
${indentSpaces}* ${content}
${indentSpaces}*/`

}