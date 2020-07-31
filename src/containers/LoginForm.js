import React, { Component } from "react";
import { Button, Form, Input, Alert } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { userActions } from "action/user.action";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verified: false,
      isFirstLoad: true,
    };
  }
  handleLogin = () => {
    console.log(this.state.verified);
    if (!this.state.verified) {
      alert("you need verifed captcha");
    } else {
      const { username, password } = this.state;
      const { login } = this.props;
      login(username, password);
      this.setState({
        isFirstLoad: false,
      });
    }
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.username, this.state.password);
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };
  onChangeCapcha = (value) => {
    if (value) {
      this.setState({ verified: true });
    }
  };

  render() {
    const inputStyle = {
      height: "40px",
      borderRadius: "5px",
    };
    const { pendding, errMessage } = this.props;
    const { username, password, isFirstLoad } = this.state;
    const activeEmail = username && password.trim();
    console.log("errMessage", errMessage);
    return (
      <div className=" mt-5  login ">
        <div className="form">
          <h1 className="name">Login</h1>
          <Form
            style={{ marginTop: "10%", zIndex: "-1" }}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            {errMessage && !isFirstLoad && (
              <Alert message={errMessage} type="error" showIcon />
            )}
            <Form.Item
              className="mt-2"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                style={inputStyle}
                value={username}
                name="username"
                onFocus={this.onFocus}
                onChange={this.onChange}
                placeholder="Please input your username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                style={inputStyle}
                value={password}
                name="password"
                onFocus={this.onFocus}
                onChange={this.onChange}
                placeholder="Password"
              />
            </Form.Item>
            {/* "6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn */}

            <ReCAPTCHA
              sitekey="6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn"
              // sitekey="6LfP964ZAAAAALLWBRE1XATl2QnwMdEMnQ1qtFbW"
              render="explicit"
              onChange={this.onChangeCapcha}
            />
            <Link className="mt-2" to="/forgetPassword">
              Forget Password
            </Link>
            <Form.Item>
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
                type="primary"
                loading={pendding}
                disabled={!activeEmail}
                onClick={this.handleLogin}
                onFocus={this.onFocus}
              >
                Login
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) =>
    dispatch(userActions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
