import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import RequestForm from "containers/ForgetPassword/RequestForm";

class ForgetPassword extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "10px" }}>
          <RequestForm />
        </div>

        <Footer />
      </div>
    );
  }
}

export default ForgetPassword;
