import { IS2Loader, RestS2Loader } from "./S2Loader";
const DefaultLocaleFun: () => string = function () {
    return navigator.language;
};
const DefaultLoaderFactory: (groupkey: string) => IS2Loader = function (groupkey: string) {
    return RestS2Loader.Default;
}

class S2Config {

    public Locale: string | (() => string) = DefaultLocaleFun;

    public Loader: IS2Loader | ((groupKey: string) => IS2Loader) = DefaultLoaderFactory;

    public getConfigLocale(): string {
        if (typeof this.Loader === "string") {
            return this.Loader;
        } else {
            return (this.Locale as () => string)();
        }
    }
    public getConfigLoader(groupkey: string): IS2Loader {
        if (typeof this.Loader === "function") {
            return this.Loader(groupkey);
        } else {
            return this.Loader as IS2Loader;
        }
    }
}
export default new S2Config()