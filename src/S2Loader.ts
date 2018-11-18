
export interface IS2Loader {
    loadGroup(groupKey: string, localeCode: string): Promise<{ [key: string]: string }>
}
export class RestS2Loader implements IS2Loader{
    public static Default:RestS2Loader=new RestS2Loader();

    loadGroup(groupKey: string, localeCode: string): Promise<{ [key: string]: string; }> {
        let fileName = [groupKey, localeCode, 'sr.json'].filter(p => p).join('.');
        let path = `/i18n/${fileName}`;
        return fetch(path).then(res=>res.json());
    }
}