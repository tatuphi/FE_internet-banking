import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import VerticalMenu from "containers/Share/VerticalMenu";
import HistoryForm from "containers/historyForm";

class HistoryPayment extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#757272" }}>
                <Header />
                <div
                    className="container"
                    style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
                >
                    <Row>
                        <Col span={6}>
                            <VerticalMenu />
                        </Col>
                        <Col span={18}>
                            <HistoryForm />
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

export default HistoryPayment;
