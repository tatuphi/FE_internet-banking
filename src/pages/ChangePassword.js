import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import ChangePasswordForm from "containers/ChangePasswordForm";
import { Row, Col } from "antd";
import VerticalMenu from "containers/Share/VerticalMenu";

class ChangePassword extends Component {
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
              <ChangePasswordForm />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ChangePassword;
