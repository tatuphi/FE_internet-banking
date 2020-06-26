import React, { Component } from "react";
import { Button, Form, Input, Select } from "antd";
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
    };
  }
  handleLogin = () => {
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.username, this.state.password);
  };
  onChangeCapcha = (value) => {
    console.log("Captcha value:", value);
  }
  ReCAPTCHAForm = (props) => {
    const recaptchaRef = React.useRef();

    const onSubmitWithReCAPTCHA = async () => {
      const token = await recaptchaRef.current.executeAsync();
      console.log('1', token);
    }
  }
  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };
  render() {
    const inputStyle = {
      height: "40px",
      borderRadius: "5px",
    };
    const { pendding } = this.props;
    const { username, password } = this.state;
    const activeEmail = username && password.trim();
    return (
      <div className=" mt-5 loginForm">
        <div
          style={{
            marginRight: "5%",
            marginLeft: "5%",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "blue",
            }}
          >
            Login
          </h1>
          <Form
            style={{ marginTop: "10%", zIndex: "-1" }}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
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
                style={inputStyle}
                value={username}
                name="username"
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
                // style={inputStyle}
                value={password}
                name="password"
                onChange={this.onChange}
                placeholder="Password"
              />
            </Form.Item>
            {/* 6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn */}

            {/* <form onSubmit={this.onSubmitWithReCAPTCHA}>
              <ReCAPTCHA
                ref={this.recaptchaRef}

                sitekey="6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn"
              />
            </form> */}
            <ReCAPTCHA

              sitekey="6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn "
            />
            <Link to="/forgetPassword">Forget Password</Link>
            <Form.Item>
              <Button
                style={{
                  width: "100%",
                  background: "#F4D03F",
                  height: "40px",
                  borderRadius: "10px",
                  opacity: "1",
                }}
                type="primary"
                loading={pendding}
                disabled={!activeEmail}
                onClick={this.handleLogin}
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) =>
    dispatch(userActions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
