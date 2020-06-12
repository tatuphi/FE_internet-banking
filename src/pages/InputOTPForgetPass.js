import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import InputOTPForm from "containers/ForgetPassword/InputOTPForm";

class InputOTPForgetPass extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "10px" }}>
          <InputOTPForm />
        </div>

        <Footer />
      </div>
    );
  }
}

export default InputOTPForgetPass;
