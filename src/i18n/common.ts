/*
Do not edit this file manually, because it is generated by tools 'sr'.
*/
import S2Base from "../core/S2Base"
class common extends S2Base {
    public get groupKey(): string {
        return "strongres.common";
    }
    /**
    * 查找键为'equals'，类似 == 的本地化字符串。
    */
    public get equals(): string {
        return this.getSRValue("equals");
    }
    /**
    * 查找键为'not_equals'，类似 != 的本地化字符串。
    */
    public get not_equals(): string {
        return this.getSRValue("not_equals");
    }
    /**
    * 查找键为'aa'，类似 啊啊 的本地化字符串。
    */
    public get aa(): string {
        return this.getSRValue("aa");
    }
    /**
    * 查找键为'abc'的本地化内容。
    */
    public get abc(): string[] {
        return this.getSRValue("abc");
    }
    /**
    * 查找键为't'的本地化内容。
    */
    public get t(): number {
        return this.getSRValue("t");
    }
    /**
    * 查找键为'numarray'的本地化内容。
    */
    public get numarray(): number[] {
        return this.getSRValue("numarray");
    }
    /**
    * 查找键为'number'的本地化内容。
    */
    public get number(): any {
        return this.getSRValue("number");
    }
    public format_test(args: any): string {
        return this.formatSRValueWithArgs("test", args);
    }
    public text(arg0: any, arg1: any): string {
        let args = [arg0, arg1];
        return this.format_test(args);
    }
    public format_test2(args: any): string {
        return this.formatSRValueWithArgs("test2", args);
    }

}
export default new common();