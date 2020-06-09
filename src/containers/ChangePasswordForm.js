import React, { Component } from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
class ChangePasswordForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> CHANGE THE PASSWORD</div>
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Current password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password name="password" onChange={this.onChange} />
          </Form.Item>
          <Form.Item
            label="New password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password name="password" onChange={this.onChange} />
          </Form.Item>
          <Form.Item
            label="New password confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
            ]}
          >
            <Input.Password name="password" onChange={this.onChange} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" className="btnSubmit" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ChangePasswordForm;
