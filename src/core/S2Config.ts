import { IS2Loader, RestS2Loader } from "./S2Loader";
import { IS2Store, MemoryStore } from "./S2Store";
const DefaultLocaleFun: () => string = function () {
    return navigator.language;
};


class S2Config {

    public Locale: string | (() => string) = DefaultLocaleFun;

    public Loader: IS2Loader = RestS2Loader.Default;

    public Store: IS2Store = MemoryStore.Default;

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
export default new S2Config()