import React, { Component } from "react";
import { Row, Col } from "antd";

import VerticalMenu from "containers/Share/VerticalMenu";
import HistoryForm from "containers/historyForm";

class HistoryPayment extends Component {
    render() {
        return (
            <div className="commom">
                {/* <Header /> */}
                <div className="container background">
                    <Row>
                        <Col span={6}>
                            <VerticalMenu />
                        </Col>
                        <Col span={18}>
                            <HistoryForm />
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

export default HistoryPayment;
