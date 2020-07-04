import React, { Component } from "react";
import { Form, Input, Select, Button, DatePicker, Alert } from "antd";
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
      isFirstLoad: true,
      isSecondLoad: true
    };
  }
  handleRegisterAccount = () => {
    const { fullName, email, phone } = this.state;
    const { registerAccount } = this.props;
    registerAccount(fullName, email, phone);
    this.setState({ isFirstLoad: false, isSecondLoad: false });
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
      isSecondLoad: true

    });
  };
  render() {
    const { pendding, errMessage, isSuccessCreate } = this.props;
    const { fullName, email, phone, isFirstLoad, isSecondLoad } = this.state;
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
          {errMessage && !isFirstLoad &&
            <Alert
              message={errMessage}

              type="error"
              showIcon
            />
          }
          {isSuccessCreate && !isSecondLoad &&
            <Alert
              message="Create success"
              type="success"
              showIcon
            />
          }
          <Form.Item
            className="mt-3"
            label=" Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input name="fullName" value={fullName} onChange={this.onChange} onFocus={this.onFocus} />
          </Form.Item>
          <Form.Item
            label=" Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input name="email" value={email} onChange={this.onChange} onFocus={this.onFocus} />
          </Form.Item>

          <Form.Item label="Address">

            <Form.Item
              noStyle
              rules={[{ required: true, message: "Street is required" }]}
            >
              <Input style={{ marginTop: 10 }} placeholder="Input street" onFocus={this.onFocus} />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input name="phone" value={phone} onChange={this.onChange} onFocus={this.onFocus} />
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
              onFocus={this.onFocus}
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
    pendding: state.employee.pendding,
    errMessage: state.employee.errMessage,
    isSuccessCreate: state.employee.isSuccessCreate,
  };
};

const mapDispatchToProps = (dispatch) => ({
  registerAccount: (fullName, email, phone) =>
    dispatch(employeeActions.registerAccount(fullName, email, phone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);
