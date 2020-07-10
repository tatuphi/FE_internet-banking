import React, { Component } from "react";

import ChangePasswordForm from "containers/ChangePasswordForm";
import { Row, Col } from "antd";
import VerticalMenu from "containers/Share/VerticalMenu";

class ChangePassword extends Component {
  render() {
    return (
      <div className="commom">

        <div className="container background">
          <Row>
            <Col span={6}>
              <VerticalMenu />
            </Col>
            <Col span={18}>
              <ChangePasswordForm />
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

export default ChangePassword;
