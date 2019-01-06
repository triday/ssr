"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tsharp");
class RestS2Loader {
    constructor(prefiex = 'i18n', moduleUrlFormat = '/{prefix}/{locale}/{module}.json') {
        this.prefiex = prefiex;
        this.moduleUrlFormat = moduleUrlFormat;
    }
    loadGroups(module, locale) {
        let args = {
            prefiex: this.prefiex,
            module: module,
            locale: locale
        };
        let path = String.format(this.moduleUrlFormat, args).replace('//', '/');
        return fetch(path).then(res => res.json()).then((alljson) => {
            let resJson = {};
            Object.keys(alljson).forEach(key => {
                resJson[`${key}`] = alljson[key];
            });
            return resJson;
        });
    }
}
RestS2Loader.Default = new RestS2Loader();
exports.RestS2Loader = RestS2Loader;
//# sourceMappingURL=SRLoader.js.map