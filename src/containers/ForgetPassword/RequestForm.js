import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { userActions } from "action/user.action";
import { connect } from "react-redux";
import InputOTPForm from "./InputOTPForm";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
    };
  }
  handleSendEmail = () => {
    const { username, email } = this.state;
    const { requestForgotPassword } = this.props;

    requestForgotPassword(username, email);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };

  render() {
    const { pendding, sendOTP, errMessage } = this.props;
    const { username, email } = this.state;
    const activeEmail = email.trim();

    return (
      <div className="outletMain">
        {sendOTP ? (
          <InputOTPForm username={username} email={email} />
        ) : (
          <div>
            <div className="formName"> SET UP THE PASSWORD</div>
            <Form className="myForm" {...layout} form={this.form}>
              {errMessage && (
                <Form.Item>
                  <h6 style={{ color: "red" }}>{errMessage}</h6>
                </Form.Item>
              )}
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                />
              </Form.Item>

              <Form.Item
                className="btnSubmitItem"
                label=" "
                colon={false}
                shouldUpdate
              >
                <Button
                  className="btnSubmit"
                  htmlType="submit"
                  loading={pendding}
                  disabled={!activeEmail}
                  type="primary"
                  onClick={this.handleSendEmail}
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    errMessage: state.user.errMessage,
    sendOTP: state.user.sendOTP,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestForgotPassword: (username, email) =>
    dispatch(userActions.requestForgotPassword(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
