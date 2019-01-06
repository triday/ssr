"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gen_1 = require("./commands/gen");
const copy_1 = require("./commands/copy");
const log = require("fancy-log");
require("colors");
const commands = {
    "gen": gen_1.default,
    "copy": copy_1.default
};
const [, , ...argv] = process.argv;
const [cmd, args] = argv.length == 0 ? ['gen', []] : [argv[0], argv.slice(1)];
if (cmd in commands) {
    commands[cmd].run(args);
}
else {
    log.error(`Unknow Command: "${cmd}"`.red);
}
//# sourceMappingURL=SR.js.map