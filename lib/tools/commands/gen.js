"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const Config_1 = require("../Config");
const path = require("path");
const utils = require("../Utils");
const JSCodeGen_1 = require("../generators/JSCodeGen");
const TSCodeGen_1 = require("../generators/TSCodeGen");
const log = require("fancy-log");
require("colors");
const all_gens = {
    'ts': TSCodeGen_1.generate_ts,
    'js': JSCodeGen_1.generate_js,
};
class GenCommand extends base_1.default {
    run(args) {
        let config = Config_1.getSrConfig();
        let fromDir = path.join(config.resBaseDir, config.fromLocale);
        let alljsonFiles = this.getAllJsonFiles(fromDir, args);
        alljsonFiles.forEach(file => {
            let relativeJsonName = path.relative(fromDir, file);
            let targetfile = utils.changeExt(path.join(config.codeBaseDir, relativeJsonName), config.codeType);
            let groupKey = utils.getGroupKey(utils.trimExt(relativeJsonName));
            let fullGroupKey = utils.getFullGroupKey(config.moduleName, groupKey);
            let className = utils.normalName(path.basename(relativeJsonName, '.json'));
            let gentrator = all_gens[config.codeType];
            this.genTargetFile(file, targetfile, className, fullGroupKey, gentrator);
        });
    }
    getAllJsonFiles(fromDir, args) {
        return utils.getAllJsonFiles(fromDir);
    }
    genTargetFile(file, target, className, fullGroupKey, generator) {
        try {
            let data = utils.getJsonFromFile(file);
            let content = generator(className, fullGroupKey, data);
            utils.writeContentToFile(content, target);
            log.warn(`Generate file "${target}" OK.`.green);
        }
        catch (error) {
            log.warn(`Generate file "${target}" Error: ${error}.`);
            throw new Error(`gen target file [${target}] error.\n${error}`.red);
        }
    }
}
exports.default = new GenCommand();
//# sourceMappingURL=gen.js.map