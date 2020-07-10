import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "containers/LoginForm";
import { userActions } from "action/user.action";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const src = "/logo_transparent.png"

    return (
      <div className="login ">
        <div className="row  loginname">
          <div className="col-sm-6 col-md-6 mt-5">
            <Link to='/'>
              <img src={src} alt="logo" style={{ width: '90%' }} />

            </Link>
          </div>
          <div className="col-sm-6 col-md-6 mt-5 " >
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
