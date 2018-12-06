import { ISRLoader, RestS2Loader } from "./SRLoader";
import { ISRStore, MemoryStore } from "./SRStore";
const DefaultLocaleFun: () => string = function () {
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
        let root: any = window;
        return root.lang;
    }
};


class StrongRes {

    public Locale: string | (() => string) = DefaultLocaleFun;

    public Loader: ISRLoader = RestS2Loader.Default;

    public Store: ISRStore = MemoryStore.Default;

    public getConfigLocale(): string {
        if (typeof this.Loader === "string") {
            return this.Loader;
        } else {
            return (this.Locale as () => string)();
        }
    }


    public async ensureModule(moduleName: string): Promise<void> {
        let locale = this.getConfigLocale();
        if (!this.Store.hasModule(moduleName, locale)) {
            const datas = await this.Loader.loadGroups(moduleName, locale);
            this.Store.saveModule(moduleName, locale, datas);
        }
    }

}
export default new StrongRes()