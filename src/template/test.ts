import S2Base from "../S2Base"
class test extends S2Base {
    public get groupKey() {
        return "test"
    }
    public get equals(): string {
        return this.getSRText("equals");
    }
    public get notEquals(): string {
        return this.getSRText("notequals");
    }
    
}

export default new test();