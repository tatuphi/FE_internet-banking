import React, { Component } from "react";
import { Button, Form, Input, } from "antd";
import { connect } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { userActions } from "action/user.action";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLogin = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);

  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,

    });
    console.log(this.state.email, this.state.password);
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
    const { email, password } = this.state;
    const activeEmail = email && password.trim();
    return (
      <div className=" mt-5">
        <div style={{
          marginRight: '5%', marginLeft: '10%'
        }}>
          < h1 style={{ textAlign: 'center', fontWeight: 'bolder', color: 'white', }}>Login</h1>
          <Form
            style={{ marginTop: '10%' }}
            name="basic"
            initialValues={{
              remember: true,
            }}

          >
            <Form.Item

              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input style={inputStyle}
                value={email}
                name="email"
                onChange={this.onChange}
                placeholder="Please input your email" />
            </Form.Item>

            <Form.Item

              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password style={inputStyle}
                value={password}
                name="password"
                onChange={this.onChange}
                placeholder="Please input your password" />
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

                disabled={!activeEmail}
                onClick={this.handleLogin}
              >
                Login
        </Button>
            </Form.Item>
          </Form>
        </div >
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(userActions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

