import React, { Component } from "react";

import ManageEmployeeForm from "containers/AdminRole/ManageEmployeeForm";
import AdminMenu from "containers/AdminRole/AdminMenu";

class ManageEmployee extends Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#757272" }}>

          <div
            className="container"
            style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
          >

            <AdminMenu />

            <ManageEmployeeForm />

          </div>

        </div>
      </div>
    );
  }
}

export default ManageEmployee;
