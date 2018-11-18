import * as React from "react";
import test from "./template/test";
import { SR } from "./SR"
export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {

        return <SR resources={[test]}>
                    <h1>{test.equals},{test.notEquals}{test.equals},{test.notEquals} Hello from {this.props.compiler} and  {this.props.framework}!</h1>;
            </SR>;

    }
}