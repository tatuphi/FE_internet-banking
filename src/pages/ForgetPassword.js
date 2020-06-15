import React, { Component } from "react";
import { connect } from "react-redux";
import RequestForm from "containers/ForgetPassword/RequestForm";
import { userActions } from "action/user.action";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";

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
        <Header />
        <div className="container" style={{ paddingTop: "10px", width: "50%" }}>
          <RequestForm />
        </div>
        <Footer />
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
