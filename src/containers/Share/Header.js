import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { deptActions } from 'action/dept.action';
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
      open: false,

    }
  }
  componentDidMount = () => {
    const { getNumUnreadNotification } = this.props;
    getNumUnreadNotification();
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible, open: !this.state.open });
    this.props.getNumUnreadNotification()
  };
  componentDidMount = () => {
    this.props.getNumUnreadNotification()

  };

  render() {
    const isAuth = localStorage.getItem('isAuth');
    const fullName = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const { numUnreadNotification } = this.props;
    const { visible, open } = this.state;
    console.log("numUnreadNotification", numUnreadNotification);
    const { logout } = this.props;
    return (
      <div className=" head ">
        <nav className=" nav header">
          <Link to="" className="nav-link active web-name ">
            Internet Banking
          </Link>
          <Link to="" className="nav-link active web-name1 mr-5">
            MPBank
          </Link>
          <div className="nav-link ml-auto user-nav ">
            {isAuth ? (

              < div className="d-flex">
                {role === 'CUSTOMER' &&
                  < Popover title="Notifications"

                    content={<Notification type="button" />}
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    {numUnreadNotification > 0 && !open ? (
                      <Badge
                        count={
                          numUnreadNotification > 99
                            ? '99+'
                            : numUnreadNotification
                        }
                        className="mt-2"
                        type="button"
                      >
                        <BellOutlined style={{ fontSize: 23 }} />
                      </Badge>
                    ) : (
                        <div type="button">
                          <BellOutlined style={{ fontSize: 20 }} />
                        </div>
                      )}
                  </Popover>
                }
                <p className="ml-5" style={{ fontWeight: "500", fontSize: '23px', color: 'white' }} >{fullName}</p>
                <Button className="ml-5" onClick={logout}>Logout</Button>
              </div>

            ) : (
                <>
                  <Link className="mr-4 nameLogin " to="/login">
                    Đăng Nhập
            </Link>
                </>
              )}
          </div>
        </nav>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  numUnreadNotification: state.dept.numUnreadNotification,

});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getNumUnreadNotification: () =>
    dispatch(deptActions.getNumUnreadNotification()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
