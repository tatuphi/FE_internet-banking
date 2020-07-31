import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col } from "antd";
import { userActions } from "action/user.action";

import VerticalMenu from "containers/Share/VerticalMenu";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfor: {
        username: " ",
        email: " ",
        fullName: "",
      },
    };
  }

  componentDidMount = () => {
    const { getUserCurrent } = this.props;
    getUserCurrent();
  };

  render() {
    const { userInfo } = this.props;
    let { userInfor } = this.state;
    userInfor = { ...userInfo };
    console.log("userInfor", userInfor);
    console.log(userInfor.email);

    return (
      <div className="commom">
        <div className="container background">
          <Row>
            <Col span={6}>
              <VerticalMenu />
            </Col>
            <Col span={18}>
              <div className="outletMain">
                <div className="formName">INFORMATION PERSONAL </div>

                <Form
                  {...layout}
                  name="nest-messages mt-5"
                  validateMessages={validateMessages}
                >
                  <Form.Item label="User Name">
                    <Input value={userInfor.username} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    rules={[
                      {
                        type: "email",
                      },
                    ]}
                  >
                    <Input value={userInfor.email} />
                  </Form.Item>

                  <Form.Item label="Full Name">
                    <Input value={userInfor.fullName} />
                  </Form.Item>

                  {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
        </Button>
                                    </Form.Item> */}
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserCurrent: () => dispatch(userActions.getUserCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
