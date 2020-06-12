import React, { Component } from "react";
import { Form, Input, Button } from "antd";
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

class InputOTPForm extends Component {
  render() {
    return (
      <div className="outletMain  ">
        <div className="formName"> SET UP THE PASSWORD</div>
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item className="resItem" label="Username" name="username">
            <span className="resText">1432352Q452</span>
          </Form.Item>
          <Form.Item className="resItem" label="Email" name="email">
            <span className="resText">tatuphi@gmail.com</span>
          </Form.Item>
          <Form.Item className="resItem" label="ID Card" name="idCard">
            <span className="resText">212487426</span>
          </Form.Item>
          <Form.Item className="resItem" label="Email gets OTP" name="emailOTP">
            <span className="resText">tatuphi@gmail.com</span>
          </Form.Item>
          <Form.Item style={{ textAlign: "right", fontWeight: "bold" }}>
            OTP has just been sent to your email !!!
          </Form.Item>
          <Form.Item label="OTP Code" name="otpCode">
            <Input style={{ width: "60%" }} placeholder="Input the OTP" />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              className="btnSubmit"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Back
            </Button>
            <Button className="btnSubmit" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default InputOTPForm;
