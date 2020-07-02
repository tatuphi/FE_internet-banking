import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { employeeActions } from "action/employee.action";
import { connect } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

class ApplyMoneyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerInformation: "",
      amountMoney: "",
    };
  }
  handleApplyMoney = () => {
    const { customerInformation, amountMoney } = this.state;
    const { applyMoney } = this.props;
    applyMoney(customerInformation, amountMoney);
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
    });
  };
  render() {
    const { customerInformation, amountMoney } = this.state;
    const { pendding, errMessage } = this.props;
    const active = customerInformation && customerInformation.trim();
    return (
      <div className="outletMain">
        <div>
          <div className="formName"> APPLY MONEY FOR CUSTOMER</div>
          <Form className="myForm" {...layout} form={this.form}>
            {errMessage && (
              <Form.Item>
                <h6 style={{ color: "red" }}>{errMessage}</h6>
              </Form.Item>
            )}
            <Form.Item
              label="Customer Information"
              name="customerInformation"
              rules={[
                {
                  required: true,
                  message: "Input username or account number of customer!",
                },
              ]}
            >
              <Input
                name="customerInformation"
                value={customerInformation}
                placeholder="Input account number or username of customer..."
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item
              label="Amount Money"
              name="amountMoney"
              rules={[
                {
                  required: true,
                  message: "Please input amount money!",
                },
              ]}
            >
              <Input
                name="amountMoney"
                value={amountMoney}
                placeholder="Please input amount money..."
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </Form.Item>
            <Form.Item className="btnSubmitItem" label=" " colon={false}>
              <Button
                type="primary"
                className="btnSubmit"
                htmlType="submit"
                loading={pendding}
                disabled={!active}
                onClick={this.handleApplyMoney}
              >
                Apply Money
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    errMessage: state.user.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  applyMoney: (customerInformation, amountMoney) =>
    dispatch(employeeActions.applyMoney(customerInformation, amountMoney)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyMoneyForm);
