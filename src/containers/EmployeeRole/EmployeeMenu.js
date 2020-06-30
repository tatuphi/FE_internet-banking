import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

class EmployeeMenu extends Component {
  render() {
    return (
      <div style={{ width: 250 }}>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1" icon={<ContactsOutlined />}>
            <Link to="/employee/createAccount">Create customer account</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FullscreenExitOutlined />}>
            <Link to="/employee/applyMoney">Apply money</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FullscreenOutlined />}>
            <Link to="/employee/customerTransaction">
              Customer history transaction
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default EmployeeMenu;
