"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SRLoader_1 = require("./SRLoader");
const SRStore_1 = require("./SRStore");
const DefaultLocaleFun = function () {
    return getQueryStringLang() ||
        getLocalStorageLang() ||
        getCookieLang() ||
        getGlobalLang() ||
        getHtmlNodeLang() ||
        getNavigatorLang() ||
        getDefaultLang();
    function getHtmlNodeLang() {
        if (document) {
            let htmlNode = document.querySelector('html');
            return htmlNode && htmlNode.getAttribute('lang');
        }
    }
    function getNavigatorLang() {
        return navigator && navigator.language;
    }
    function getLocalStorageLang() {
        return localStorage && localStorage.getItem('lang');
    }
    function getQueryStringLang() {
        if (location && location.search) {
            let match = location.search.match(/[\?\&]lang=([^\&]+)/i);
            return match && match[1];
        }
    }
    function getCookieLang() {
        if (document && document.cookie) {
            let match = document.cookie.match(/(^| )lang=([^;]*)(;|$)/i);
            return match && match[2];
        }
    }
    function getDefaultLang() {
        return 'zh-CN';
    }
    function getGlobalLang() {
        let root = window;
        return root.lang;
    }
};
class StrongRes {
    constructor() {
        this.Locale = DefaultLocaleFun;
        this.Loader = SRLoader_1.RestS2Loader.Default;
        this.Store = SRStore_1.MemoryStore.Default;
    }
    getConfigLocale() {
        if (typeof this.Loader === "string") {
            return this.Loader;
        }
        else {
            return this.Locale();
        }
    }
    ensureModule(moduleName) {
        return __awaiter(this, void 0, void 0, function* () {
            let locale = this.getConfigLocale();
            if (!this.Store.hasModule(moduleName, locale)) {
                const datas = yield this.Loader.loadGroups(moduleName, locale);
                this.Store.saveModule(moduleName, locale, datas);
            }
        });
    }
}
exports.default = new StrongRes();
//# sourceMappingURL=StrongRes.js.map