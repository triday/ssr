import SRBase from "../SRBase"
class test extends SRBase {
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