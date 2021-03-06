import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { userActions } from "action/user.action";
import { connect } from "react-redux";
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

class InputOTPForm extends Component {
  constructor(props) {
    super(props);
    const { email, username } = this.props;
    this.state = {
      otp: "",
      email,
      username,
      newPassword: "",
      newPasswordConfirm: "",
      isSecondErr: true,
    };
  }
  handleForgetPassword = () => {
    const { username, email, otp, newPassword } = this.state;
    const { forgotPassword } = this.props;
    forgotPassword(email, username, otp, newPassword);
    this.setState({ isSecondErr: false });
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
  handleCancelModal = () => {
    const { handleCancel } = this.props;
    handleCancel();
  };
  render() {
    const {
      otp,
      email,
      username,
      newPasswordConfirm,
      newPassword,
      isSecondErr,
    } = this.state;
    const { pendding, errOtp } = this.props;
    const active =
      email &&
      username &&
      otp.trim() &&
      otp.length === 6 &&
      newPassword.trim() &&
      newPassword.length >= 8 &&
      newPassword === newPasswordConfirm;

    return (
      <div>
        <div className="form">
          <h4 className="name">Set up password</h4>
          <Form className="myForm" {...layout} form={this.form}>
            {errOtp && !isSecondErr && (
              <Form.Item>
                <h6 style={{ color: "red" }}>{errOtp}</h6>
              </Form.Item>
            )}
            <Form.Item className="resItem" label="Username" name="username">
              <span name="username" className="resText">
                {username}
              </span>
            </Form.Item>
            <Form.Item className="resItem" label="Email" name="email">
              <span name="email" className="resText">
                {email}
              </span>
            </Form.Item>
            <Form.Item className="resItem" label="Email gets OTP">
              <span name="emailOTP" className="resText">
                {email}
              </span>
            </Form.Item>
            <Form.Item style={{ textAlign: "right", fontWeight: "bold" }}>
              OTP has just been sent to your email !!!
            </Form.Item>
            <Form.Item
              label="OTP Code"
              name="otp"
              rules={[
                { required: true, message: "Please input your OTP!" },
                { length: 6, message: "OTP has 6 numbers!" },
              ]}
            >
              <Input
                name="otp"
                value={otp}
                onChange={this.onChange}
                onFocus={this.onFocus}
                style={{ width: "60%" }}
                placeholder="Input the OTP"
              />
            </Form.Item>
            <Form.Item
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
                {
                  minLength: 8,
                  message: "New password has at least 8 characters!",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item
              label="New password confirm"
              name="newPasswordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please input your new password confirm!",
                },
                {
                  minLength: 8,
                  message: "New password confirm has at least 8 characters!",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="newPasswordConfirm"
                value={newPasswordConfirm}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item className="btnSubmitItem" label=" " colon={false}>
              <Button
                className="btnSubmit"
                onClick={this.handleCancelModal}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button
                className="btnSubmit"
                htmlType="submit"
                loading={pendding}
                disabled={!active}
                type="primary"
                onClick={this.handleForgetPassword}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    errOtp: state.user.errOtp,
  };
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email, username, otp, newPassword) =>
    dispatch(userActions.forgotPassword(email, username, otp, newPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputOTPForm);
