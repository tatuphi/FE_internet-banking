import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { Button, Badge, Popover } from "antd";
import Notification from 'containers/notification';
import {
  BellOutlined
} from '@ant-design/icons';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,

    }
  }

  handleVisibleChange = () => {
    const { visible } = this.state
    this.setState({ visible: !visible });

  };


  render() {
    const isAuth = localStorage.getItem('isAuth');
    const fullName = localStorage.getItem('user');
    const { logout } = this.props;
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
            {isAuth ? (
              <div className="d-flex">
                <Popover title="Notifications"
                  style={{ width: 1000 }}
                  content={<Notification type="button" />}
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >


                  <Badge className="mt-2" count={5}>
                    <BellOutlined className="head-example" onClick={this.handleVisibleChange} style={{ fontSize: '25px', }} />
                  </Badge>
                </Popover>

                <p className="ml-5" style={{ fontWeight: "500", fontSize: '23px', color: 'white' }} >{fullName}</p>
                <Button className="ml-5" onClick={logout}>Logout</Button>
              </div>
            ) : (
                <>
                  <Link className="mr-4 login" to="/login">
                    Đăng Nhập
            </Link>
                </>
              )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,

});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
