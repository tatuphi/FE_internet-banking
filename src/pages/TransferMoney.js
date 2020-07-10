import React, { Component } from "react";

import { Row, Col } from "antd";


import TransferMoneyForm from "containers/TransferMoneyForm";
import VerticalMenu from "containers/Share/VerticalMenu";

class TransferMoney extends Component {
  render() {
    return (
      <div className="commom">

        <div
          className="container background"

        >
          <Row>
            <Col span={6}>
              <VerticalMenu />
            </Col>
            <Col span={18}>
              <TransferMoneyForm />
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}


export default TransferMoney;
