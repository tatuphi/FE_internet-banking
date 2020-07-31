import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { userActions } from "action/user.action";
import { connect } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};
class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      isFirstLoad: true,
      isSuccess: true,
    };
  }
  handleUpdatePassword = () => {
    const { currentPassword, newPassword } = this.state;
    const { updatePassword } = this.props;
    updatePassword(currentPassword, newPassword);
    this.setState({
      isFirstLoad: false,
      isSuccess: false,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
      isSuccess: true,
    });
  };

  render() {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirm,
      isFirstLoad,
      isSuccess,
    } = this.state;
    const { pendding, updatedPassword, errMessage } = this.props;
    const active =
      currentPassword &&
      newPassword.trim() &&
      newPassword.length >= 8 &&
      newPassword === newPasswordConfirm;
    return (
      <div className="outletMain">
        <div>
          <div className="formName"> CHANGE THE PASSWORD</div>
          <Form className="myForm" {...layout} form={this.form}>
            {updatedPassword && !isFirstLoad && (
              <Form.Item>
                <h6 style={{ color: "green" }}>
                  Change Password Successfully!
                </h6>
              </Form.Item>
            )}
            {errMessage && !isSuccess && (
              <Form.Item>
                <h6 style={{ color: "red" }}>{errMessage}</h6>
              </Form.Item>
            )}
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password
                name="currentPassword"
                value={currentPassword}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                name="newPassword"
                value={newPassword}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item
              label="New Password Confirm"
              name="newPasswordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password
                name="newPasswordConfirm"
                value={newPasswordConfirm}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item className="btnSubmitItem" label=" " colon={false}>
              <Button
                type="primary"
                className="btnSubmit"
                htmlType="submit"
                loading={pendding}
                disabled={!active}
                onClick={this.handleUpdatePassword}
              >
                Save
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
    errMessage: state.user.errMessage,
    updatedPassword: state.user.updatedPassword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (currentPassword, newPassword) =>
    dispatch(userActions.updatePassword(currentPassword, newPassword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
