import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

class AdminMenu extends Component {
  render() {
    return (
      <div >
        <Menu mode="horizontal" >
          <Menu.Item key="1" icon={<ContactsOutlined />}>
            <Link to="/admin/getEmployee">Manage Employee</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FullscreenExitOutlined />}>
            <Link to="/admin/transactionOtherBank">
              History transaction with other bank
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AdminMenu;
