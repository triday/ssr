import gen from "./tools/commands/gen";
import copy from "./tools/commands/copy";
import BaseCommand from "./tools/commands/base";

const commands: { [key: string]: BaseCommand } = {
    "gen": gen,
    "copy": copy
};
const [node, filepath, ...argv] = process.argv;
const [cmd, args] = argv.length == 0 ? ['gen', []] : [argv[0], argv.slice(1)];

if (cmd in commands) {
    commands[cmd].run(args);
}