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
    const src = "/logo_transparent.png";

    return (
      <div className="login ">
        <div className="row  loginname">
          <div className="col-sm-6 col-md-6 mt-5">
            <Link to="/">
              <img src={src} alt="logo" style={{ width: "90%" }} />
            </Link>
          </div>
          <div className="col-sm-6 col-md-6 mt-5 ">
            <RequestForm />
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
  requestForgotPassword: (username, email) =>
    dispatch(userActions.requestForgotPassword(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
