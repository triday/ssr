
import "tsharp"
import S2Config from "./S2Config"


export default abstract class S2Base {
    /**
     * 返回groupkey
     */
    public abstract get groupKey(): string;

    public getSRValue(srKey: string): any {
        return this.getSRValueInternal(this.groupKey, srKey, S2Config.getConfigLocale());
    }
    private getSRValueInternal(groupKey: string, srKey: string, localeCode: string): any {
        let allLocales = this.getAllLocalesCodes(localeCode);
        for (let i = 0; i < allLocales.length; i++) {
            let obj = S2Config.Store.getGroup(groupKey, allLocales[i]);
            if (obj && srKey in obj) {
                return obj[srKey];
            }
        }
        console.warn(`can not find key ['${srKey}'] in group ['${groupKey}'].`);
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
    protected formatSRValueWithArgs(srKey: string, args: any): string {
        return String.format(this.getSRValue(srKey), args);
    }




}
