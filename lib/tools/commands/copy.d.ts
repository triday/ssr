import BaseCommand from "./base";
import "colors";
declare class CopyCommand extends BaseCommand {
    run(args: string[]): void;
}
export declare function copyResource(rootDir: string, targetDir: string, moduleName: string, rootNode: string): void;
declare const _default: CopyCommand;
export default _default;
