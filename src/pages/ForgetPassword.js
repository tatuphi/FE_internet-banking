import React, { Component } from "react";
import { connect } from "react-redux";
import RequestForm from "containers/ForgetPassword/RequestForm";
import { userActions } from "action/user.action";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
    };
  }
  render() {
    return (
      <div>
        <div className="container" style={{ paddingTop: "10px" }}>
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
