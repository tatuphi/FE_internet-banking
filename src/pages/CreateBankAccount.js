import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import CreateAccountForm from "containers/CreateAccountForm";

class CreateBankAccount extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "10px" }}>
          <CreateAccountForm />
        </div>

        <Footer />
      </div>
    );
  }
}

export default CreateBankAccount;
