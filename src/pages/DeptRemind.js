import React, { Component } from "react";
import { Row, Col } from "antd";

import VerticalMenu from "containers/Share/VerticalMenu";
import DeptReminder from "containers/deptReminder";

class DeptRemind extends Component {
    render() {
        return (
            <div className="commom">

                <div className="container background">
                    <Row>
                        <Col span={6}>
                            <VerticalMenu />
                        </Col>
                        <Col span={18}>
                            <DeptReminder />
                        </Col>
                    </Row>
                </div>

            </div>

        );
    }
}

export default DeptRemind;
