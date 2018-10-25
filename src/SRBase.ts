
import Locale, { ISRLoader } from "./Locale"


class CacheSRLoader implements ISRLoader {
    public static Instance = new CacheSRLoader();
    private caches: { [key: string]: { [key: string]: string; } }={};
    private constructor() {
    }
    loadGroup(groupKey: string, localeCode: string): { [key: string]: string; } {
        let cacheKey = `${groupKey}#${localeCode}`;
        if (cacheKey in this.caches) {
            return this.caches[cacheKey];
        } else {
            let loader = Locale.GetLoader(groupKey);
            if (!loader) {
                console.error(`Can not find loader for group '${groupKey}'`);
                return {}
            } else {
                try {
                    let res = loader.loadGroup(groupKey, localeCode);
                    return this.caches[cacheKey] = res;
                } catch (error) {
                    console.error(`Error when load group '${groupKey}' with locale '${localeCode}'.[${error}]`);
                    return this.caches[cacheKey] = {};
                }
            }
        }
    }
}

export default abstract class SRBase {

    public locale: string;

    public abstract get groupKey(): string;

    public getSRText(srKey: string): string {
        return this.getSRTextInternal(this.groupKey, srKey, this.locale || Locale.CurrentLocale || '');
    }
    private getSRTextInternal(groupKey: string, srKey: string, localeCode: string): string {
        let allLocales = this.getAllLocalesCodes(localeCode);
        for (let i = 0; i < allLocales.length; i++) {
            let obj = CacheSRLoader.Instance.loadGroup(groupKey, allLocales[i]);
            if (srKey in obj) {
                return obj[srKey];
            }
        }
        return `!${srKey}`;
    }
    private getAllLocalesCodes(localeCode: string): string[] {
        let res: string[] = [];
        let localeParts = (localeCode || '').split('-');
        for (let i = 0; i < localeParts.length; i++) {
            res.push(localeParts.slice(0, i).join('-'));
        }
        res.push(localeCode);
        return res.reverse();
    }

}
