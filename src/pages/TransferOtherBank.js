import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import TransferOtherForm from "containers/TransferOtherForm";
import VerticalMenu from "containers/Share/VerticalMenu";

class TransferOtherBank extends Component {
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
              <TransferOtherForm />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TransferOtherBank;