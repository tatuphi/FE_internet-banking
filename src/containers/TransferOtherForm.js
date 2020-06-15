import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class TransferOtherForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> TRANSFER MONEY TO OTHER BANK</div>
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
            label="Current balance"
            name="currentBalance"
          >
            <span className="resText">20,000,000 VND</span>
          </Form.Item>
          <div className="titlePart">BENEFICIARY INFORMATION</div>
          <hr />
          <Form.Item label="Account number" name="accountNumber">
            <Input placeholder="Input account number" />
          </Form.Item>
          <Form.Item label="Bank name" name="username">
            <Select defaultValue="Quyen Bank Name">
              <Option value="quyen">Quyen Bank Name</Option>
              <Option value="nhi">Nhi Bank Name</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Save beneficiary information" name="username">
            <Checkbox className="resText" />
          </Form.Item>

          <div className="titlePart">TRANSACTION INFORMATION</div>
          <hr />
          <Form.Item label="Transfer amount" name="username">
            <Input placeholder="Input amount" />
          </Form.Item>
          <Form.Item label="Transfer content" name="username">
            <Input placeholder="Input transfer content" />
          </Form.Item>
          <Form.Item label="Transfer fee" name="username">
            <Select defaultValue="Payer">
              {/* nguoi chuyen tra phi */}
              <Option value="District 1">Payer</Option>
              {/* nguoi nhan tra phi */}
              <Option value="District 2">Payee</Option>
            </Select>
          </Form.Item>

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

export default TransferOtherForm;
