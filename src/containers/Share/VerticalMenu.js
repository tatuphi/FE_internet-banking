import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

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
    return (
      <div style={{ width: 250 }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
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
          <SubMenu
            key="sub1"
            icon={<NotificationOutlined />}
            title="Debt Reminder"
          >
            <Menu.Item key="5">
              <Link to="/deptRemind">Debt Reminder List</Link>
            </Menu.Item>

          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<DollarCircleOutlined />}
            title="Transaction History"
          >
            <Menu.Item key="5">
              <Link to="/historyPagement">History Payment</Link>
            </Menu.Item>
            {/* <Menu.Item key="9">Receive Money</Menu.Item> */}
            {/* <Menu.Item key="10">Transfer Money</Menu.Item>
            <Menu.Item key="11">Debt Reminder Payment</Menu.Item> */}
          </SubMenu>
          <MenuItem key="12" icon={<ContactsOutlined />}>
            <Link to="/beneficiary">Beneficiary Settings</Link>
          </MenuItem>
          <SubMenu
            key="sub3"
            icon={<InfoCircleOutlined />}
            title="Profile Settings"
          >
            <Menu.Item key="13">Change Password</Menu.Item>
            <Menu.Item key="14">Profile</Menu.Item>
          </SubMenu>
          <Menu.Item key="15" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default VerticalMenu;
