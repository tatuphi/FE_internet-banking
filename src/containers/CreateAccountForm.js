import React, { Component } from "react";
import { Form, Input, Select, Button, DatePicker } from "antd";

const { Option } = Select;
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};

class CreateAccountForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> CHANGE THE PASSWORD</div>
        <Form
          className="myForm"
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label=" Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Address">
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select placeholder="Select province">
                  <Option value="Ho Chi Minh">Ho Chi Minh</Option>
                  <Option value="Ha Noi">Ha Noi</Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                rules={[{ required: true, message: "District is required" }]}
              >
                <Select placeholder="Select district">
                  <Option value="District 1">District 1</Option>
                  <Option value="District 2">District 2</Option>
                </Select>
              </Form.Item>
            </Input.Group>
            <Form.Item
              noStyle
              rules={[{ required: true, message: "Street is required" }]}
            >
              <Input style={{ marginTop: 10 }} placeholder="Input street" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Birth Date">
            <DatePicker rules={[{ required: true }]} />
          </Form.Item>

          <Form.Item label=" " colon={false}>
            <Button className="btnSubmit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default CreateAccountForm;
