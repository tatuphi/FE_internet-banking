import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="head">
        <nav className="nav header ">
          <Link to="" className="nav-link active web-name ">
            Internet Banking
          </Link>
          <Link to="" className="nav-link active web-name1 mr-5">
            MPBank
          </Link>
          <div className="nav-link ml-auto">
            {/* {isLogined ? (
              <UserNav />
            ) : (
              <> */}
            <Link className="mr-4 login" to="/login">
              Đăng Nhập
            </Link>
            {/* </>
            )} */}
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
