import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class TransferMoneyForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> TRANSFER MONEY TO BENEFICIARY AT MPBANK</div>
        <div className="titlePart">FORM OF TRANSFER</div>
        <hr />
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Form of transfer" name="username">
            <Select defaultValue="Form 1">
              <Option value="District 1">Form 1</Option>
              <Option value="District 2">Form 2</Option>
            </Select>
          </Form.Item>
        </Form>
        <div className="titlePart">TRANSFER INFORMATION</div>
        <hr />
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Source account" name="username">
            <Select defaultValue="Account 1">
              <Option value="District 1">Account 1</Option>
              <Option value="District 2">Account 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="resItem"
            label="Current Balance"
            name="currentBalance"
          >
            <span className="resText">20,000,000 VND</span>
          </Form.Item>
        </Form>
        <div className="titlePart">BENEFICIARY INFORMATION</div>
        <hr />
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Search" name="username">
            <Input placeholder="Input reminiscent name" />
          </Form.Item>
          <Form.Item label="Account number" name="username">
            <Input placeholder="Input account number" />
          </Form.Item>
          <Form.Item label="Beneficiary name" name="username">
            <Input placeholder="Input beneficiary name" />
          </Form.Item>
          <Form.Item label="Save beneficiary information" name="username">
            <Checkbox className="resText" />
          </Form.Item>
        </Form>
        <div className="titlePart">TRANSACTION INFORMATION</div>
        <hr />
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Transfer amount" name="username">
            <Input placeholder="Input amount" />
          </Form.Item>
          <Form.Item label="Transfer content" name="username">
            <Input placeholder="Input transfer content" />
          </Form.Item>
          <Form.Item label="Transfer fee" name="username">
            <Select defaultValue="Payer">
              <Option value="District 1">Payer</Option>
              <Option value="District 2">Payee</Option>
            </Select>
          </Form.Item>
        </Form>
        <Form>
          <Form.Item label=" " colon={false}>
            <Button
              className="btnSubmit"
              style={{ marginTop: "10px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default TransferMoneyForm;
