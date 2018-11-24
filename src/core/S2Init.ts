import S2Config from "./S2Config";
import S2Store from "./S2Store";
import "tsharp";

export async function initGroup(locale: string, groupKey: string): Promise<{ [key: string]: string }> {
    const loader = S2Config.getConfigLoader(groupKey);
    if (!S2Store.hasGroup(groupKey, locale)) {
        const datas = await loader.loadGroup(groupKey, locale);
        S2Store.storeGroup(groupKey, locale, datas);
    }
    return S2Store.pickGroup(groupKey, locale);
};
interface InitResult {
    groupKey: string;
    success: boolean;
    datas: { [key: string]: string };
}
export async function initGroups(locale: string, ...groupKey: string[]): Promise<InitResult[]> {
    const alltasks = groupKey.map(p => initGroup(locale, p));
    const results = await Promise.all(alltasks);
    return results.select(p => {
        return {
            groupKey: '',
            success: true,
            datas: p
        }
    });
}