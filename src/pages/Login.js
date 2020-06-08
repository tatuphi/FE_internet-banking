import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, } from "antd";

import LoginForm from "containers/LoginForm";
import { userActions } from "action/user.action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const src = '/logo.jpg'
    const back = {
      // background: `url(${src})`,
      background: 'black',
      width: '100%',
      height: '100%',
      opacity: '0.8',
    }
    const { pendding } = this.props;
    return (
      <div style={back} >
        <div className="row" >
          <div className="col col-6 col-md-6 "  >
            <img style={{ height: 590, width: 700, }} src='/instagram_profile_image.png' alt='logo' />
          </div>
          <div className="col col-6 col-md-6 " style={{ marginTop: '5%', }}>
            <LoginForm />
          </div>

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
  login: (email, password) => dispatch(userActions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
