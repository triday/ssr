
class Store {
    public static Instance = new Store();
    private caches: { [key: string]: { [key: string]: string; } } = {};
    private constructor() {
    }
    pickGroup(groupKey: string, localeCode: string): { [key: string]: string; } {
        let cacheKey = `${groupKey}#${localeCode}`;
        return this.caches[cacheKey] || {};
    }
    storeGroup(groupKey: string, localeCode: string, datas: { [key: string]: string; }): void {
        let cacheKey = `${groupKey}#${localeCode}`;
        this.caches[cacheKey] = datas;
    }
    hasGroup(groupKey: string, localeCode: string) {
        let cacheKey = `${groupKey}#${localeCode}`;
        return cacheKey in caches;
    }
}
export default Store.Instance