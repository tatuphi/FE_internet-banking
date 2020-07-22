import React, { Component } from "react";
import { Row, Col } from "antd";
import VerticalMenu from "containers/Share/VerticalMenu";
import BeneficiaryForm from "containers/BeneficiaryForm";

class Beneficiary extends Component {
  render() {
    return (
      <div className="commom">
        <div
          className="container"

        >
            <Row>
              <Col span={6}>
                <VerticalMenu />
              </Col>
              <Col span={18}>
                <BeneficiaryForm />
              </Col>
            </Row>
        </div>

      </div>
    );
  }
}

export default Beneficiary;
