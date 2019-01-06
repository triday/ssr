import "tsharp";
export default abstract class SRBase {
    /**
     * 返回groupkey
     */
    abstract readonly groupKey: string;
    /**
     * 返回所有的键。
     */
    abstract readonly allKeys: string[];
    /**
     * 获取指定的键的本地化值。
     * @param srKey 指定的键。
     */
    getSRValue(srKey: string): any;
    /**
     * 获取一组键对应的本地化值。
     * @param srKeys 指定的一组键。
     */
    getSRValues(...srKeys: string[]): any[];
    /**
     * 格式化指定的键对应的本地化字符串。
     * @param srKey 指定的键。
     * @param args 格式化的参数对象。
     */
    formatSRValue(srKey: string, args: any): string;
    private getSRValueInternal;
    private getAllLocalesCodes;
}
