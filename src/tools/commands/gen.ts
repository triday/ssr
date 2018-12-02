import BaseCommand from "./base";
import { getSrConfig } from "../Config";
import * as path from "path";
import * as utils from "../Utils";
import { generate_js } from "../generators/JSCodeGen";
import { generate_ts } from "../generators/TSCodeGen";
const all_gens: { [key: string]: (classname: string, groupKey: string, data: { [key: string]: any }) => string } = {
    'ts': generate_ts,
    'js': generate_js,

}
class GenCommand extends BaseCommand {
    run(args: string[]) {
        let config = getSrConfig();
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
    private getAllJsonFiles(fromDir: string, args: string[]): string[] {
        return utils.getAllJsonFiles(fromDir);
    }
    private genTargetFile(file: string, target: string, className: string, fullGroupKey: string, generator: (classname: string, groupKey: string, data: { [key: string]: any }) => string): void {
        try {
            let data = utils.getJsonFromFile(file);
            let content = generator(className, fullGroupKey, data);
            utils.writeContentToFile(content, target);
        } catch (error) {
            throw new Error(`gen target file [${target}] error.\n${error}`);
        }
    }
}

export default new GenCommand();