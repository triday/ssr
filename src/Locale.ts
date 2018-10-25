import * as $ from "jQuery";
export interface ISRLoader {
    loadGroup(groupKey: string, localeCode: string): { [key: string]: string }
}
export class JsonLoader implements ISRLoader {
    loadGroup(groupKey: string, localeCode: string): { [key: string]: string; } {
        let fileName = [groupKey, localeCode, 'sr.json'].filter(p => p).join('.');
        let path = `/i18n/${fileName}`;
        let b=$.ajax({
            url:path,
            async:false
        });
        return b.responseJSON;
    }
}
export default class Locale {
    private static _currentLocale: string = 'zh-CN';
    public static get CurrentLocale(): string {
        return this._currentLocale;
    }
    public static set CurrentLocale(v: string) {
        this._currentLocale = v;
    }
    public static Loader: ISRLoader = new JsonLoader();
    public static GetLoader(groupKey: string) {
        return Locale.Loader;
    }
}
