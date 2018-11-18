import * as React from "react";
import S2Base from "./S2Base";
import * as init from "./S2Init"
interface SRProps {
    locale?: string;
    resources: S2Base[];
}
interface SRState {
    locale: string;
    loaded: boolean
}
export class SR extends React.Component<SRProps, SRState> {
    constructor(props: SRProps) {
        super(props);
        this.state = {
            locale: props.locale,
            loaded: false,
        }
    }
    componentDidMount() {
        let allgroupkeys = (this.props.resources || []).select(p => p.groupKey);
        init.initGroups("zh-CN", ...allgroupkeys).then((res) => {
            this.setState({ loaded: true });
            (this.props.children as React.ReactNode)
        })
    }
    render() {
        if (this.state.loaded) {
            
            return this.props.children;
        }
        return null;
    }

}
