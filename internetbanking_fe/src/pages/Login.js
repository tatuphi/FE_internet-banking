import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

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
    const { pendding } = this.props;
    return (
      <div>
        <h2>Login page</h2>
        <Button loading={pendding}>Login</Button>
        <LoginForm />
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
