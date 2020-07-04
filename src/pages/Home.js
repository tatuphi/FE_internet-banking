import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import VerticalMenu from "containers/Share/VerticalMenu";
import TransferOtherForm from "containers/TransferOtherForm";

class Home extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#757272", height: '100%' }}>
        <Header />
        <div
          className="container"
          style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black", height: '100%' }}
        >
          <Row style={{ height: '100%' }}>
            <Col span={6} >
              <VerticalMenu />
            </Col>
            <Col span={18}>

            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
