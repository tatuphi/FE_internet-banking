import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import { Row, Col } from "antd";
import ManageEmployeeForm from "containers/AdminRole/ManageEmployeeForm";
import AdminMenu from "containers/AdminRole/AdminMenu";

class ManageEmployee extends Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#757272" }}>
          <Header />
          <div
            className="container"
            style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
          >

            <AdminMenu />

            <ManageEmployeeForm />

          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ManageEmployee;
