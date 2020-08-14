import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { userActions } from "action/user.action";
import { connect } from "react-redux";
import InputOTPForm from "./InputOTPForm";

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      loadOpt: false,
    };
  }
  handleSendEmail = () => {
    const { username, email } = this.state;
    const { requestForgotPassword } = this.props;

    requestForgotPassword(username, email);
    this.setState({
      loadOpt: true,
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
    });
  };
  handleCancel = () => {
    this.setState({ loadOpt: false });
    console.log("mo");
  };

  render() {
    const { pendding, sendOTP, errMessage } = this.props;
    const { username, email, loadOpt } = this.state;
    const activeEmail = email.trim();
    console.log(errMessage);
    const inputStyle = {
      height: "40px",
      borderRadius: "5px",
    };
    return (
      <div>
        <div>
          {sendOTP && loadOpt ? (
            <InputOTPForm
              username={username}
              email={email}
              handleCancel={this.handleCancel}
            />
          ) : (
            <div className=" mt-5  login ">
              <div className="form">
                <h4 className="name">Set up password</h4>

                <Form
                  className="myForm"
                  form={this.form}
                  style={{ marginTop: "10%", zIndex: "-1" }}
                >
                  {errMessage && (
                    <Form.Item>
                      <h6 style={{ color: "red" }}>{errMessage}</h6>
                    </Form.Item>
                  )}
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      style={{ inputStyle }}
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      style={{ inputStyle }}
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    />
                  </Form.Item>

                  <Form.Item shouldUpdate>
                    <Button
                      style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        opacity: "1",
                        marginTop: "10px",
                        color: "white",
                        fontWeight: "bolder",
                        backgroundColor: "#1890ff",
                      }}
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
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    errMessage: state.user.errFogot,
    sendOTP: state.user.sendOTP,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestForgotPassword: (username, email) =>
    dispatch(userActions.requestForgotPassword(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
