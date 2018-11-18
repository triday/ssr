
import "tsharp"
import S2Config from "./S2Config"
import S2Store from "./S2Store"

export default abstract class S2Base {

    public locale: string;

    public abstract get groupKey(): string;

    public getSRText(srKey: string): string {
        return this.getSRTextInternal(this.groupKey, srKey, this.locale || S2Config.getConfigLocale() || '');
    }
    private getSRTextInternal(groupKey: string, srKey: string, localeCode: string): string {
        let allLocales = this.getAllLocalesCodes(localeCode);
        for (let i = 0; i < allLocales.length; i++) {
            let obj = S2Store.pickGroup(groupKey, allLocales[i]);
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
    protected format_args(fmt: string, ...args: any[]): string {
        return String.format(fmt, args);
    }

}
