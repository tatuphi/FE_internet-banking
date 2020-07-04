import React, { Component } from "react";
import { Form, Input, Button, Alert } from "antd";
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
      isFirstLoad: true,
      isSecondLoad: true
    };
  }
  handleApplyMoney = () => {
    const { customerInformation, amountMoney } = this.state;
    const { applyMoney } = this.props;
    applyMoney(customerInformation, amountMoney);
    this.setState({ isFirstLoad: false, isSecondLoad: false })
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onFocus = () => {
    this.setState({
      isFirstLoad: true,
      isSecondLoad: true
    });
  };
  render() {
    const { customerInformation, amountMoney, isFirstLoad, isSecondLoad } = this.state;
    const { pendding, errMessage, isApplySuccess } = this.props;
    const active = customerInformation && customerInformation.trim();
    console.log("k", errMessage);
    console.log("k", isFirstLoad);
    return (
      <div className="outletMain">
        <div>
          <div className="formName"> APPLY MONEY FOR CUSTOMER</div>
          <Form className="myForm" {...layout} form={this.form}>
            {errMessage && !isFirstLoad &&
              <Alert
                message={errMessage}
                type="error"
                showIcon
              />

            }
            {isApplySuccess && !isSecondLoad &&
              <Alert
                message="Create success"
                type="success"
                showIcon
              />
            }
            <Form.Item className="mt-3"
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
                type="number"
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
    pendding: state.employee.pendding,
    errMessage: state.employee.errMessage,
    isApplySuccess: state.employee.isApplySuccess

  };
};

const mapDispatchToProps = (dispatch) => ({
  applyMoney: (customerInformation, amountMoney) =>
    dispatch(employeeActions.applyMoney(customerInformation, amountMoney)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyMoneyForm);
