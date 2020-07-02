import React, { Component } from "react";
import { Form, Input, Select, Button, DatePicker } from "antd";
import { employeeActions } from "action/employee.action";
import { connect } from "react-redux";

const { Option } = Select;

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      phone: "",
    };
  }
  handleRegisterAccount = () => {
    const { fullName, email, phone } = this.state;
    const { registerAccount } = this.props;
    registerAccount(fullName, email, phone);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.username, this.state.password);
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };
  render() {
    const { pendding } = this.props;
    const { fullName, email, phone } = this.state;
    const active = fullName && email.trim() && phone;
    return (
      <div className="outletMain">
        <div className="formName">CREATE BANK ACCOUNT</div>
        <Form
          className="myForm"
          name="complex-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={this.form}
        >
          <Form.Item
            label=" Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input name="fullName" value={fullName} onChange={this.onChange} />
          </Form.Item>
          <Form.Item
            label=" Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input name="email" value={email} onChange={this.onChange} />
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
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input name="phone" value={phone} onChange={this.onChange} />
          </Form.Item>
          <Form.Item label="Birth Date">
            <DatePicker rules={[{ required: true }]} />
          </Form.Item>

          <Form.Item className="btnSubmitItem" label=" " colon={false}>
            <Button
              className="btnSubmit"
              type="primary"
              htmlType="submit"
              loading={pendding}
              disabled={!active}
              onClick={this.handleRegisterAccount}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
  };
};

const mapDispatchToProps = (dispatch) => ({
  registerAccount: (fullName, email, phone) =>
    dispatch(employeeActions.registerAccount(fullName, email, phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);
