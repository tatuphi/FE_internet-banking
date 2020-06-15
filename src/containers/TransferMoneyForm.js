import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button, Modal } from "antd";
import { connect } from "react-redux";
import { userActions } from "action/user.action";
import { transactionActions } from "action/transaction.action";

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


class TransferMoneyForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    const { accountNumber, } = this.props;
    this.state = {
      account: "",
      amount: "",
      content: " ",
      pay: false,
      visible: false,
      otp: ' ',
      // accountSource: '',
      // balance: ' '
      // accountSource: [...this.props.accountNumber],
      accNumber: accountNumber.length > 0 ? accountNumber[0].accountNumber : '',
      accBalance: accountNumber.length > 0 ? accountNumber[0].currentBalance : ''

    };
  }
  componentDidMount = () => {
    const { getAccountNumber, receiverTransfer } = this.props;
    let type = 'Credit'
    getAccountNumber(type);
    receiverTransfer();

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.accountNumber.length !== 0 && !prevState.accNumber) {
      this.setState({
        accBalance: this.props.accountNumber[0].currentBalance,
        accNumber: this.props.accountNumber[0].accountNumber,
      })
    }

    if (this.props.transferUser.userSender && this.props.transferUser.userSender.currentBalance !== prevState.accBalance) {
      this.setState({
        accBalance: this.props.transferUser.userSender.currentBalance
      })
    }




  }



  onGenderChange = value => {
    // this.formRef.current.setFieldsValue({
    //   account: value,
    // });

    console.log('change value ', value)
    this.setState({ account: value })
  };
  onChangeAcount = (value) => {
    this.setState({
      account: value
    })


  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    ;

  };
  onChangePayer = value => {
    let check = null;
    if (value === "true") {
      check = true;
    }
    else {
      check = false
    }
    this.setState({
      pay: check,
    })
    console.log(this.state.pay);
  }
  handleSubmit = () => {
    const { account, amount, content, pay, } = this.state
    const { requestReceiver } = this.props;
    requestReceiver(account, amount, content, pay)
    this.setState({ visible: true });

  }
  handleSubmitMoney = () => {
    const { account, amount, content, pay, otp } = this.state
    const { verifyOTP } = this.props;
    verifyOTP(account, amount, content, pay, otp)
    // this.setState({ visible: true });


  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  render() {
    const { receiver, pendding1, transactionUser, showNextModal,
      errMessage, transferUser, pendding2, errMess } = this.props;
    console.log("1", errMess);
    const { account, amount, content, otp, accBalance, accNumber } = this.state
    const activeEmail = account && amount && content.trim();

    console.log("receiver", transactionUser);

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <span>VND</span>
      </Form.Item>
    );

    return (
      <div className="outletMain">
        <div className="formName"> TRANSFER MONEY TO BENEFICIARY AT MPBANK</div>

        <hr />

        <div className="titlePart">TRANSFER INFORMATION</div>
        <hr />

        <Form className="myForm" {...layout} form={this.form}>

          <Form.Item label="Source account" name="username">
            <p className="resText mt-2">{accNumber}</p>
          </Form.Item>
          <Form.Item
            className="resItem"
            label="Current Balance"
            name="currentBalance"
          >

            <span className="resText" > {accBalance}  VNĐ</span>

          </Form.Item>
        </Form>

        <div className="titlePart"> INFORMATION ACCOUNT</div>
        <hr />

        <Form {...layout} name="control-ref" className="myForm" {...layout} form={this.form}>
          {errMess && (
            <Form.Item>
              <h6 style={{ color: "red" }}>{errMess}</h6>
            </Form.Item>
          )}
          <Form.Item
            name="Receiver"
            label="Receiver"
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.onGenderChange}

              showSearch
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {receiver.map((item, index) =>
                <Option key={index} value={item.numberAccount}>{item.nameAccount}</Option>
              )}


            </Select>
          </Form.Item>



          <Form.Item
            label="accountNumber"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: "Please input your account number",
              },
            ]}
          >
            <Input name="account"
              value={account} onChange={this.onChange} />
          </Form.Item>
          <Form.Item label="Save beneficiary information" name="username">
            <Checkbox className="resText" />
          </Form.Item>

          <div className="titlePart">TRANSACTION INFORMATION</div>
          <hr />

          <Form.Item label="Transfer amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your amount money",
              },
            ]}
          >

            <Input addonAfter={prefixSelector} placeholder="Input amount" name="amount"
              value={amount}
              onChange={this.onChange}
            />
          </Form.Item>


          <Form.Item label="Transfer content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input your content!',
              },
            ]}
          >
            <Input placeholder="Input amount" name="content"
              value={content}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label="Transfer fee">
            <Select onChange={this.onChangePayer}>
              <Option value="true">Payer</Option>
              <Option value="false">Payee</Option>
            </Select>
          </Form.Item>


          <Form.Item label=" " colon={false}>
            <Button
              className="btnSubmit"
              style={{ marginTop: "10px" }}
              type="primary"
              htmlType="submit"
              loading={pendding2}

              onClick={this.handleSubmit}
            >
              continue
            </Button>
          </Form.Item>

        </Form>



        {showNextModal ?
          <Modal
            title="Transfer"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form>
              <Form.Item className="resItem" label="Source account" name="username">
                <h6 name="username" className="resText">
                  {transactionUser.sender.accountNumber}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Name Receiver" name="nameReceiver">
                <span name="email" className="resText">
                  {transactionUser.nameReceiver}
                </span>
              </Form.Item>
              <Form.Item className="resItem" label="account receiver">
                <h6 name="emailOTP" className="resText">
                  {transactionUser.receiver}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Money">
                <h6 name="emailOTP" className="resText">
                  {transactionUser.amountMoney}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Type Send ">
                <h5 name="emailOTP" className="resText">
                  {transactionUser.typeSend ? "pay" : "payer"}
                </h5>
              </Form.Item>
              <Form.Item className="resItem" label="Content">
                <h6 name="emailOTP" className="resText">
                  {transactionUser.content}
                </h6>
              </Form.Item>
              <Form.Item style={{ textAlign: "center", fontWeight: "bold" }}>
                OTP has just been sent to your email !!!
          </Form.Item>
            </Form>
            <Form >
              {errMessage && (
                <Form.Item>
                  <h6 style={{ color: "red" }}>{errMessage}</h6>
                </Form.Item>
              )}
              <Form.Item
                label="OTP Code"
                name="otp"
                rules={[
                  { required: true, message: "Please input your OTP!" },
                  { length: 6, message: "OTP has 6 numbers!" },
                ]}
              >
                <Input
                  name="otp"
                  value={otp}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  style={{ width: "60%" }}
                  placeholder="Input the OTP"
                />
              </Form.Item>

              <Form.Item >

                <Button
                  className="btnSubmit"
                  // htmlType="submit"
                  loading={pendding1}
                  // disabled={!active}
                  type="primary"
                  onClick={this.handleSubmitMoney}
                >
                  Submit
            </Button>
              </Form.Item>
            </Form>

            <p>{transferUser.msg}</p>

          </Modal>
          : " "
        }
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    accountNumber: state.user.accountNumber,
    receiver: state.transaction.receiver,
    pendding1: state.transaction.pendding,
    transactionUser: state.transaction.transactionUser,
    showNextModal: state.transaction.showNextModal,
    errMess: state.transaction.errMess,
    transferUser: state.transaction.transferUser,
    pendding2: state.transaction.pendding,
    errMessage: state.transaction.errMessage,


  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
  receiverTransfer: () => dispatch(transactionActions.receiverTransfer()),
  // getUserCurrent: () => dispatch(transactionActions.getUserCurrent())
  requestReceiver: (receiver, amountMoney, content, typeSend) => dispatch(transactionActions.requestReceiver(receiver, amountMoney, content, typeSend)),
  verifyOTP: (receiver, amountMoney, content, typeSend, otp) => dispatch(transactionActions.verifyOTP(receiver, amountMoney, content, typeSend, otp))


});
export default connect(mapStateToProps, mapDispatchToProps)(TransferMoneyForm);
