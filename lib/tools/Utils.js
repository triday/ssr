"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function getJsonFromFile(file) {
    let alltext = fs.readFileSync(file, 'utf-8').trim();
    try {
        return JSON.parse(alltext || '{}');
    }
    catch (error) {
        throw new Error(`can not read json from file '${file}'`);
    }
}
exports.getJsonFromFile = getJsonFromFile;
function writeJsonToFile(data, file, zip = true) {
    if (zip) {
        writeContentToFile(JSON.stringify(data), file);
    }
    else {
        writeContentToFile(JSON.stringify(data, null, 4), file);
    }
}
exports.writeJsonToFile = writeJsonToFile;
function writeContentToFile(content, file) {
    mkdirsSync(path.dirname(file));
    fs.writeFileSync(file, content);
}
exports.writeContentToFile = writeContentToFile;
function getAllJsonFiles(dir) {
    let res = [];
    fs.existsSync(dir) && fs.readdirSync(dir).forEach((p) => {
        let file = path.join(dir, p);
        let stat = fs.statSync(file);
        if (stat.isFile() && isjsonfile(file)) {
            res.push(file);
        }
    });
    return res;
}
exports.getAllJsonFiles = getAllJsonFiles;
function isjsonfile(file) {
    return path.extname(file).toLowerCase() === '.json';
}
exports.isjsonfile = isjsonfile;
function changeExt(file, newExt) {
    if (newExt) {
        return `${trimExt(file)}.${newExt.replace(/^\.+/g, '')}`;
    }
    return trimExt(file);
}
exports.changeExt = changeExt;
function trimExt(file) {
    let currentExt = path.extname(file);
    return currentExt.length > 0 ? file.slice(0, -currentExt.length) : file;
}
exports.trimExt = trimExt;
function getFullGroupKey(module, groupKey) {
    return `${module}.${groupKey}`;
}
exports.getFullGroupKey = getFullGroupKey;
function getGroupKey(path) {
    return path.replace(/[\\/]/g, '.');
}
exports.getGroupKey = getGroupKey;
function normalName(name) {
    let res = name.replace(/[^a-zA-Z0-9]/g, '_');
    if (res) {
        return (res[0] >= '0' && res[0] <= '9') ? `_${res}` : res;
    }
    else {
        return '_';
    }
}
exports.normalName = normalName;
function mkdirsSync(dirname) {
    if (!fs.existsSync(dirname)) {
        mkdirsSync(path.dirname(dirname));
        fs.mkdirSync(dirname);
    }
}
exports.mkdirsSync = mkdirsSync;
//# sourceMappingURL=Utils.js.map