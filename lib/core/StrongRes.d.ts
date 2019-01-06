import { ISRLoader } from "./SRLoader";
import { ISRStore } from "./SRStore";
declare class StrongRes {
    Locale: string | (() => string);
    Loader: ISRLoader;
    Store: ISRStore;
    getConfigLocale(): string;
    ensureModule(moduleName: string): Promise<void>;
}
declare const _default: StrongRes;
export default _default;
