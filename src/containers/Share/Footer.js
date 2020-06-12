import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="foot">
        <nav className="nav footer ">
          <Link to="" className="nav-link active web-name mr-5">
            Hotline: 0334994998
          </Link>
        </nav>
      </div>
    );
  }
}

export default Footer;
