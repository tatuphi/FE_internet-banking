import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button, Modal, Alert } from "antd";
import { connect } from "react-redux";
import { userActions } from "action/user.action";
import { transactionActions } from "action/transaction.action";
import { Link } from "react-router-dom";
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class TransferOtherForm extends Component {
  constructor(props) {
    super(props);

    const { accountNumber, receiver } = this.props;
    this.state = {
      account: "",
      amount: "",
      content: " ",
      pay: true,
      visible: false,
      otp: ' ',
      accNumber: accountNumber.length > 0 ? accountNumber[0].accountNumber : '',
      accBalance: accountNumber.length > 0 ? accountNumber[0].currentBalance : '',
      isShow: true,
      isfistLoad: true,
      issuccessModal: true,
      isModal: false,
      accnameReceiver: " ",
      receiverInfo: [...receiver],
      naBank: "S2QBank",
    };
  }
  componentDidMount = () => {
    const { getAccountNumber, receiverTransfer, getLinkBank } = this.props;
    let type = 'Credit'
    let idBank = "5ee353c900cceb8a5001c7cf";
    let sentData = {};
    sentData.idBank = idBank;
    getAccountNumber(type);
    receiverTransfer(sentData);
    getLinkBank();

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
  onChangeNameBank = (value) => {
    this.setState({
      naBank: value,
    })
  }
  // verifyOTPLinkBank: (nameBank, receiver, amountMoney, content, typeSend, otp)
  handleSubmit = () => {
    const { account, amount, content, pay, naBank } = this.state
    const { linkBankAccount } = this.props;
    // (nameBank, content, amountMoney, receiver, typeSend)
    linkBankAccount(naBank, content, amount, account, pay);
    this.setState({
      visible: true,
      isfistLoad: false
    });

  }
  handleSubmitMoney = () => {
    const { account, amount, content, pay, otp, naBank } = this.state
    const { verifyOTPLinkBank } = this.props;
    let code = otp.trim();
    // verifyOTPLinkBank = (nameBank, content, amountMoney, receiver, typeSend, code) => {
    verifyOTPLinkBank(naBank, content, amount, account, pay, code);
    this.setState({
      issuccessModal: false,
      isModal: true,
      isShow: false
    });



  }
  showModal = () => {
    this.setState({
      visible: false,



    });

  };
  handleOk = e => {
    console.log(e);
    this.setState({
      account: "",
      amount: "",
      content: " ",
      pay: false,
      visible: false,
      otp: ' ',

    });

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      amount: ' ',
      content: ' ',
      otp: ' ',
      account: ' ',


    });
  };
  showSuccess = () => {
    this.setState({
      isModal: false,
      amount: " ",
      account: ' ',
      otp: ' ',
      content: '',
      visible: false,
      isModal: false,
      isShow: true,
      isfistLoad: true,
      issuccessModal: true,
      accnameReceiver: " ",


    });
  }
  totalMoney = (amount, type) => {
    let m = null;
    if (type === true) {
      m = +amount + 3300;
    }
    else {
      m = +amount;
    }

    return `${m} VND`;
  }
  render() {
    const { penTran, transactionUser, showNextModal, receiver,
      errMessage, pendding2, errMess, successModal, getBank } = this.props;
    const { account, amount, content, otp, accBalance, accNumber, isfistLoad, isShow, issuccessModal } = this.state
    let { receiverInfo } = this.state;
    console.log("transactionUser", receiver);
    // receiverInfo = receiverInfo.length > 0 ? receiverInfo : [...receiver];
    const activeEmail = account && amount.trim();
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <span>VND</span>
      </Form.Item>
    );
    return (
      <div className="outletMain">
        <div className="formName"> TRANSFER MONEY TO OTHER BANK</div>
        <div className="titlePart">SOURCE INFORMATION</div>
        <hr />
        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Source account" name="username">
            <span className="resText">{accNumber}</span>
          </Form.Item>
          <Form.Item
            className="resItem"
            label="Current balance"
            name="currentBalance"
          >
            <span className="resText">{accBalance} VND</span>
          </Form.Item>
        </Form>
        <div className="titlePart">TRANSACTION INFORMATION</div>
        <hr />
        <Form className="myForm"  {...layout} form={this.form}>
          {errMessage && !isfistLoad && (
            <Alert message={errMessage} type="error" />

          )}
          <Form.Item className=" mt-3"
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
            // name="account"
            rules={[
              {
                required: true,
                message: "Please input your account number",
              },
            ]}
          >
            <Input name="account" type="number"
              value={account} onChange={this.onChange} />
          </Form.Item>
          <Form.Item label="Bank name" name="nameBank">
            <Select defaultValue="S2QBank"
              onChange={this.onChangeNameBank}
              showSearch

              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                getBank.map(item =>
                  <Option key={item._id} value={item._id}>{item.nameBank}</Option>
                )
              }
              {/* <Option value="S2QBank">S2QBank</Option>
              <Option value="NKLBank">NKLBank</Option> */}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Save beneficiary information" name="username">
            <Checkbox className="resText" />
          </Form.Item> */}

          <div className="titlePart">TRANSACTION INFORMATION</div>
          <hr />
          <Form.Item label="Transfer amount"

            rules={[
              {
                required: true,
                message: "Please input your amount money",
              },
            ]}
          >

            <Input addonAfter={prefixSelector} placeholder="Input amount" name="amount"
              value={amount}
              type="number"
              onChange={this.onChange}
            />
          </Form.Item>


          <Form.Item label="Transfer content"

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
              disabled={!activeEmail}

            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {showNextModal &&

          <Modal
            title="Transfer"
            visible={this.state.visible}

            style={{ top: '10px' }}
            onCancel={this.handleCancel}


            footer={[

            ]}
          >


            <Form>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Account source</div>
                <div className="col"> {transactionUser.sender.accountNumber}</div>
              </div>

              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Account destinate</div>
                <div className="col"> {account}</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">FullName </div>
                <div className="col"> {transactionUser.fullName}</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Name Bank </div>
                <div className="col">{this.state.naBank}</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Amount money </div>
                <div className="col">{amount}</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Type send </div>
                <div className="col"> {transactionUser.dataReceiver.typeSend ? "payer" : "payee"}</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Fee</div>
                <div className="col"> 3.300</div>
              </div>
              <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                <div className="col">Content</div>
                <div className="col"> {transactionUser.dataReceiver.content}</div>
              </div>
              <hr></hr>
              <div className="row" style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                <div className="col">Total:</div>
                <div className="col"> {this.totalMoney(transactionUser.dataReceiver.amountMoney, transactionUser.dataReceiver.typeSend)}</div>
              </div>






              <Form.Item style={{ textAlign: "center", fontWeight: "bold" }}>
                OTP has just been sent to your email !!!
</Form.Item>
            </Form>
            <Form >
              {errMess && !isShow && (
                <Alert message={errMess} type="error" />

              )}
              <Form.Item className="mt-2"
                label="OTP Code"

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
              <div className="d-flex">
                <Form.Item  >

                  <Button
                    className="btnSubmit ml-5"
                    htmlType="submit"
                    loading={penTran}
                    // disabled={!active}
                    type="primary"
                    onClick={this.handleSubmitMoney}

                  >
                    Transfer
              </Button>
                </Form.Item>
                <div>
                  <Button className="ml-4" onClick={this.handleCancel}>cancel</Button>
                  <Button className="ml-4" onClick={this.showModal}>Back</Button>
                </div>

              </div>
            </Form>




          </Modal>

        }
        {
          successModal && !issuccessModal &&
          <Modal
            visible={this.state.isModal}
            // onOk={this.showSuccess}
            // onCancel={this.showSuccess}
            width={300}
            footer={[
              <div>
                <Link to="/">
                  <Button type='primary'>Back home</Button>
                </Link>
                <Button type='primary' className="ml-4" onClick={this.showSuccess}>continue</Button>
              </div>
            ]}

          >
            <h5 >This transaction is complete </h5>

          </Modal>
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
    penTran: state.transaction.penTran,
    transactionUser: state.transaction.transactionUser,
    showNextModal: state.transaction.showNextModal,
    errMess: state.transaction.errMess,
    transferUser: state.transaction.transferUser,
    pendding2: state.transaction.pendding,
    errMessage: state.transaction.errMessage,
    successModal: state.transaction.successModal,
    mess: state.transaction.errMessage,
    saveInfoReceiver: state.transaction.saveInfoReceiver,
    pend: state.transaction.pend,
    getBank: state.transaction.getBank
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
  receiverTransfer: (sentData) => dispatch(transactionActions.receiverTransfer(sentData)),
  // getUserCurrent: () => dispatch(transactionActions.getUserCurrent())
  linkBankAccount: (nameBank, content, amountMoney, receiver, typeSend) => dispatch(transactionActions.linkBankAccount(nameBank, content, amountMoney, receiver, typeSend)),
  verifyOTPLinkBank: (nameBank, receiver, amountMoney, content, typeSend, otp) => dispatch(transactionActions.verifyOTPLinkBank(nameBank, receiver, amountMoney, content, typeSend, otp)),
  saveReceiverInformation: (accountNumber, accountName, idBank, nameRemind) => dispatch(transactionActions.saveReceiverInformation(accountNumber, accountName, idBank, nameRemind)),
  getLinkBank: () => dispatch(transactionActions.getLinkBank()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TransferOtherForm);


