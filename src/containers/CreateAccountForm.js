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
            name={["user", "name"]}
            label=" Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "name"]}
            label=" Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Address">
            <Input.Group compact>
              <Form.Item
                name={["address", "province"]}
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select placeholder="Select province">
                  <Option value="Ho Chi Minh">Ho Chi Minh</Option>
                  <Option value="Ha Noi">Ha Noi</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["address", "district"]}
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
              name={["address", "street"]}
              noStyle
              rules={[{ required: true, message: "Street is required" }]}
            >
              <Input style={{ marginTop: 10 }} placeholder="Input street" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name={["user", "name"]}
            label="Phone number"
            rules={[{ required: true }]}
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
