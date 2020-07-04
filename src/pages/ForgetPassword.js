import React, { Component } from "react";
import { connect } from "react-redux";
import RequestForm from "containers/ForgetPassword/RequestForm";
import { userActions } from "action/user.action";

import { Link } from "react-router-dom";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
    };
  }
  render() {
    const src = "/instagram_profile_image.png";
    const back = {
      background: 'black',
      width: "100%",
      height: "100%",
      opacity: "0.8",
    };
    return (
      <div style={back}>

        <Link to='/login'>
          <img
            style={{ height: 250, width: 400 }}
            src="/instagram_profile_image.png"
            alt="logo"
          />
        </Link>

        <div className="container" style={{ width: "50%" }}>
          <RequestForm />
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
  requestForgotPassword: (username, email) =>
    dispatch(userActions.requestForgotPassword(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
