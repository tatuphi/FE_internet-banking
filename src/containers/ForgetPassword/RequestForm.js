import React, { Component } from "react";
import { Form, Input, Button } from "antd";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class RequestForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> SET UP THE PASSWORD</div>
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ID Card"
            name="idCard"
            rules={[{ required: true, message: "Please input your ID Card!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button className="btnSubmit" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RequestForm;
