import "tsharp";

export interface IS2Loader {
    loadGroups(module: string, locale: string): Promise<{ [key: string]: { [key: string]: any } }>
}
export class RestS2Loader implements IS2Loader {

    constructor(public prefiex: string = 'i18n',public moduleUrlFormat = '/{prefix}/{locale}/{module}.json') {
    }
    public static Default: RestS2Loader = new RestS2Loader();

    loadGroups(module: string, locale: string): Promise<{ [key: string]: { [key: string]: any } }> {
        let args = {
            prefiex: this.prefiex,
            module: module,
            locale: locale
        };
        let path = String.format(this.moduleUrlFormat, args).replace('//', '/');
        return fetch(path).then(res => res.json()).then((alljson) => {
            let resJson: { [key: string]: { [key: string]: string } } = {};
            Object.keys(alljson).forEach(key => {
                resJson[`${key}`] = alljson[key];
            });
            return resJson;
        });
    }
}