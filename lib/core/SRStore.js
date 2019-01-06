"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryStore {
    constructor(host = window || {}, rootKey = 'i18n') {
        this.host = host;
        this.rootKey = rootKey;
        this.rootObject = {};
        this.host[this.rootKey] = this.rootObject = {};
    }
    removeModule(moduleName, localeCode) {
        let localeNode = this.rootObject[localeCode];
        if (localeNode) {
            delete localeNode[moduleName];
        }
    }
    saveModule(moduleName, localeCode, datas) {
        this.rootObject[localeCode] = this.rootObject[localeCode] || {};
        this.rootObject[localeCode][moduleName] = datas || {};
    }
    hasModule(moduleName, localeCode) {
        let localeNode = this.rootObject[localeCode];
        if (!localeNode)
            return null;
        return moduleName in localeNode;
    }
    getGroup(groupKey, localeCode) {
        let localeNode = this.rootObject[localeCode];
        if (!localeNode)
            return null;
        let moduleNode = localeNode[this.getModuleNameFromGroupKey(groupKey)];
        if (!moduleNode)
            return null;
        return moduleNode[groupKey];
    }
    clearLocale(localeCode) {
        delete this.rootObject[localeCode];
    }
    clearAll() {
        this.host[this.rootKey] = this.rootObject = {};
    }
    getModuleNameFromGroupKey(groupKey) {
        return (groupKey || '').split('.')[0];
    }
}
MemoryStore.Default = new MemoryStore();
exports.MemoryStore = MemoryStore;
//# sourceMappingURL=SRStore.js.map