"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tsharp");
const StrongRes_1 = require("./StrongRes");
class SRBase {
    /**
     * 获取指定的键的本地化值。
     * @param srKey 指定的键。
     */
    getSRValue(srKey) {
        return this.getSRValueInternal(this.groupKey, srKey, StrongRes_1.default.getConfigLocale());
    }
    /**
     * 获取一组键对应的本地化值。
     * @param srKeys 指定的一组键。
     */
    getSRValues(...srKeys) {
        return srKeys.select(p => this.getSRValue(p));
    }
    /**
     * 格式化指定的键对应的本地化字符串。
     * @param srKey 指定的键。
     * @param args 格式化的参数对象。
     */
    formatSRValue(srKey, args) {
        return String.format(this.getSRValue(srKey), args);
    }
    getSRValueInternal(groupKey, srKey, localeCode) {
        let allLocales = this.getAllLocalesCodes(localeCode);
        for (let i = 0; i < allLocales.length; i++) {
            let obj = StrongRes_1.default.Store.getGroup(groupKey, allLocales[i]);
            if (obj && srKey in obj) {
                return obj[srKey];
            }
        }
        console.warn(`can not find key ['${srKey}'] in group ['${groupKey}'].`);
    }
    getAllLocalesCodes(localeCode) {
        let res = [];
        let localeParts = (localeCode || '').split('-');
        for (let i = 0; i < localeParts.length; i++) {
            res.push(localeParts.slice(0, i).join('-'));
        }
        res.push(localeCode);
        return res.reverse();
    }
}
exports.default = SRBase;
//# sourceMappingURL=SRBase.js.map