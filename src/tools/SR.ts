import gen from "./commands/gen";
import copy from "./commands/copy";
import BaseCommand from "./commands/base";
import * as log from "fancy-log";
import "colors"
const commands: { [key: string]: BaseCommand } = {
    "gen": gen,
    "copy": copy
};
const [, , ...argv] = process.argv;
const [cmd, args] = argv.length == 0 ? ['gen', []] : [argv[0], argv.slice(1)];

if (cmd in commands) {
    commands[cmd].run(args);
}else{
    log.error(`Unknow Command: "${cmd}"`.red);
}