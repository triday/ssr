import BaseCommand from "./base";
import "colors";
declare class GenCommand extends BaseCommand {
    run(args: string[]): void;
    private getAllJsonFiles;
    private genTargetFile;
}
declare const _default: GenCommand;
export default _default;
