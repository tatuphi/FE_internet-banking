import React, { Component } from "react";
import { Row, Col } from "antd";
import VerticalMenu from "containers/Share/VerticalMenu";


class Home extends Component {
  render() {
    const isLogin = localStorage.getItem("isAuth");
    const role = localStorage.getItem("role");
    return (
      <div >

        <div className="commom"
        >
          <div
            className="container"

          >
            {
              isLogin ?
                <div>
                  {role === 'CUSTOMER' &&
                    <Row>
                      <Col span={6}>
                        <VerticalMenu />
                      </Col>
                      <Col span={18}>

                      </Col>
                    </Row>
                  }
                  {
                    role === 'EMPLOYEE' && <VerticalMenu />
                  }
                </div>
                : ""
            }

          </div>
        </div>

      </div>
    );
  }
}

export default Home;
