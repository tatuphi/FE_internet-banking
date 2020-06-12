import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import ChangePasswordForm from "containers/ChangePasswordForm";

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "10px" }}>
          <ChangePasswordForm />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ChangePassword;
