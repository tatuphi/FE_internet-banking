import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { userActions } from "action/user.action";

import {
  FullscreenOutlined,
  NotificationOutlined,
  DollarCircleOutlined,
  FullscreenExitOutlined,
  BankOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import { connect } from "react-redux";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";
import AdminMenu from "containers/AdminRole/AdminMenu"
const { SubMenu } = Menu;
class VerticalMenu extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const isLogin = localStorage.getItem("isAuth");
    const role = localStorage.getItem("role")
    const { logout } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }} className="outletMain">
        {isLogin ?
          <div>{
            role === "CUSTOMER" && <div >
              <Menu

                // style={{ width: '30%', fontSize: '20px' }}

                theme='dark'

                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="1" icon={<BankOutlined />}>
                  <Link to="/info"> Account List</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FullscreenExitOutlined />}>
                  <Link to="/transferMoney">Transfer in MPBank</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FullscreenOutlined />}>
                  <Link to="/transferOtherBank">Transfer to other Bank</Link>
                </Menu.Item>

                <Menu.Item key="5" icon={<NotificationOutlined />}>
                  <Link to="/deptRemind">Debt Reminder List</Link>
                </Menu.Item>


                <Menu.Item key="6" icon={<DollarCircleOutlined />}>
                  <Link to="/historyPagement">History Payment</Link>
                </Menu.Item>


                <MenuItem key="12" icon={<ContactsOutlined />}>
                  <Link to="/beneficiary">Beneficiary Settings</Link>
                </MenuItem>

                <Menu.Item key="13" icon={<InfoCircleOutlined />}>
                  <Link to="/changePassword">Change Password</Link>
                </Menu.Item>


                <Menu.Item icon={<InfoCircleOutlined />} key="14">
                  <Link to="/profile">
                    Profile
                    </Link>
                </Menu.Item>

                <Menu.Item key="15" icon={<LogoutOutlined />}>
                  <Link onClick={logout}>Logout</Link>
                </Menu.Item>
              </Menu>

            </div>
          }
            {
              role === "EMPLOYEE" && < EmployeeMenu />


            }
            {
              role === "ADMIN" && < AdminMenu />

            }


          </div>
          : " "
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerticalMenu);
