import React, { Component } from "react";
import { Button, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { userActions } from "action/user.action";

// select a role
const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
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

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };
  render() {
    const inputStyle = {

      height: '40px',
      borderRadius: '5px'
    }
    const { pendding } = this.props;
    const { username, password } = this.state;
    const activeEmail = username && password.trim();
    return (
      <div className=" mt-5 loginForm">
        <div
          style={{
            marginRight: "5%",
            marginLeft: "10%",
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
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input style={inputStyle}
                value={username}
                name="username"
                onChange={this.onChange}
                placeholder="Please input your username" />
            </Form.Item>

            <Form.Item
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

            <Form.Item>
              <Select
                showSearch
                placeholder="Select a role"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Customer</Option>
                <Option value="lucy">Employee</Option>
                <Option value="tom">Admin</Option>
              </Select>
            </Form.Item>
            {/* <Form.Item >
              <ReCAPTCHA

                sitekey="6LcNLQEVAAAAAEsLQiouq4Lm_rsj4g9f_ngtFlgn"

              />
            </Form.Item> */}
            <Form.Item >
              <Button style={{
                width: '100%', background: '#F4D03F', height: '40px',
                borderRadius: '10px', opacity: '1'
              }} type="primary"
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
  login: (username, password) => dispatch(userActions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
