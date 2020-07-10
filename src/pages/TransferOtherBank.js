import React, { Component } from "react";
import { Row, Col } from "antd";

import TransferOtherForm from "containers/TransferOtherForm";
import VerticalMenu from "containers/Share/VerticalMenu";

class TransferOtherBank extends Component {
  render() {
    return (
      <div className="commom">

        <div className="container background">
          <Row>
            <Col span={6}>
              <VerticalMenu />
            </Col>
            <Col span={18}>
              <TransferOtherForm />
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default TransferOtherBank;
