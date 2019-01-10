
import "tsharp"
import StrongRes from "./StrongRes"


export default abstract class SRBase {
    /**
     * 返回groupkey
     */
    public abstract get groupKey(): string;
    /**
     * 返回所有的键。 
     */
    public abstract get allKeys(): string[];

    /**
     * 获取指定的键的本地化值。
     * @param srKey 指定的键。
     */
    public getSRValue(srKey: string): any {
        return this.getSRValueInternal(this.groupKey, srKey, StrongRes.getConfigLocale());
    }
    /**
     * 获取一组键对应的本地化值。
     * @param srKeys 指定的一组键。
     */
    public getSRValues(...srKeys: string[]): any[] {
        return srKeys.select(p => this.getSRValue(p));
    }
    /**
     * 格式化指定的键对应的本地化字符串。
     * @param srKey 指定的键。
     * @param args 格式化的参数对象。
     */
    public formatSRValue(srKey: string, ...args: any[]): string {
        return String.format(this.getSRValue(srKey), ...args);
    }
    private getSRValueInternal(groupKey: string, srKey: string, localeCode: string): any {
        let allLocales = this.getAllLocalesCodes(localeCode);
        for (let i = 0; i < allLocales.length; i++) {
            let obj = StrongRes.Store.getGroup(groupKey, allLocales[i]);
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






}
