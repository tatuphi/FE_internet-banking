import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button, Modal, Alert, message } from "antd";
import { connect } from "react-redux";
import { userActions } from "action/user.action";
import { transactionActions } from "action/transaction.action";
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
      accNumber: accountNumber && accountNumber.length > 0 ? accountNumber[0].accountNumber : '',
      accBalance: accountNumber && accountNumber.length > 0 ? accountNumber[0].currentBalance : '',
      isShow: true,
      isfistLoad: true,
      issuccessModal: true,
      isModal: false,
      accnameReceiver: " ",
      receiverInfo: [...receiver],
      tempList: [],
      naBank: "",
      isSave: true,
      reminder: "",
      ischeck: false,
      fullName: ' ',
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
  handleSaveInfo = () => {
    let { ischeck } = this.state;
    this.setState({ ischeck: !ischeck })

  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.accountNumber && this.props.accountNumber.length !== 0 && !prevState.accNumber) {
      this.setState({
        accBalance: this.props.accountNumber[0].currentBalance,
        accNumber: this.props.accountNumber[0].accountNumber,
      })
    }

    if (this.props.transferUser.getMoney && this.props.transferUser.getMoney.userSender.currentBalance !== prevState.accBalance) {
      this.setState({
        accBalance: this.props.transferUser.getMoney.userSender.currentBalance
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

  handleSubmit = () => {
    const { account, amount, content, pay, naBank } = this.state
    const { linkBankAccount } = this.props;
    console.log("naBank", naBank);
    linkBankAccount(naBank, content, amount, account, pay);
    this.setState({
      visible: true,
      isfistLoad: false
    });

  }
  handleSubmitMoney = () => {
    const { account, amount, content, pay, otp, naBank } = this.state
    const { verifyOTPLinkBank, transactionUser } = this.props;
    let code = otp.trim();

    verifyOTPLinkBank(naBank, content, amount, account, pay, code);

    this.setState({
      issuccessModal: false,
      isModal: true,
      isShow: false,
      fullName: transactionUser.fullName
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
  onChangeName = (e) => {
    this.setState({ reminder: e.target.value });
  }
  handleSaveBen = () => {
    const { account, naBank, fullName } = this.state
    let { reminder } = this.state;
    const { saveReceiverInformation, getBank, transactionUser } = this.props;
    console.log("account", transactionUser);


    let idBank = getBank.find((ele) => ele.nameBank === naBank)

    let nameRe = fullName
    saveReceiverInformation(account, idBank._id, nameRe, reminder)
      .then(res => {
        message.success('This is a success message');
      })
      .catch(() => console.log('err when save info'))
    this.setState({
      isSave: false

    })

  }
  onGenderChange = value => {
    const { receiver } = this.props;
    let item = receiver.find(e => e.numberAccount === value)
    this.setState({
      account: value,
      naBank: item.linkedbank.nameBank

    })
  };

  render() {
    const { penTran, transactionUser, showNextModal, receiver, errsave, pend,
      errMessage, pendding2, errMess, successModal, getBank, transferUser } = this.props;
    const { account, amount, content, otp, accBalance,
      accNumber, isfistLoad, isShow, issuccessModal, isSave, reminder, naBank } = this.state

    console.log("mo123", naBank);
    // receiverInfo = isUpdate ? [...receiverInfo] : [...receiver];
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

              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {receiver.map((item, index) =>

                <Option Option key={index} value={item.numberAccount} >
                  <div className="row">
                    <div className="col">{item.nameRemind}</div>
                    <div className="col">{item.nameBeneficiary}</div>

                  </div>
                </Option>

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
          <Form.Item label="Bank name" >
            <Select defaultValue={naBank}
              onChange={this.onChangeNameBank}
              showSearch

              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                getBank.map(item =>
                  <Option key={item._id} value={item.nameBank}>{item.nameBank}</Option>
                )
              }

            </Select>
          </Form.Item>

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

        {
          showNextModal &&

          <Modal
            visible={this.state.visible}

            style={{ top: '10px' }}
            onCancel={this.handleCancel}


            footer={[

            ]}
          >
            <div >
              <div className=" formName">TRANSACTION INFORMATION</div>

              <Form.Item style={{ textAlign: "center", fontWeight: "bold", color: 'red' }}>
                OTP has just been sent to your email !!!
             </Form.Item>
              <hr></hr>

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
                  <div className="col"> {this.state.pay ? "payer" : "payee"}</div>
                </div>
                <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                  <div className="col">Fee</div>
                  <div className="col"> 3.300</div>
                </div>
                <div className="row" style={{ fontSize: '20px', fontWeight: 500 }}>
                  <div className="col">Content</div>
                  <div className="col"> {content}</div>
                </div>
                <hr></hr>
                <div className="row" style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                  <div className="col">Total:</div>
                  <div className="col"> {this.totalMoney(amount, this.state.pay)}</div>
                </div>

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
            </div>



          </Modal>

        }
        {
          successModal && !issuccessModal &&
          <Modal
            visible={this.state.isModal}
            // onOk={this.showSuccess}
            onCancel={this.showSuccess}
            bodyStyle={{ background: 'green' }}
            width={300}
            footer={[

              <div>

                <Button type='primary' style={{ width: '100%' }} onClick={this.showSuccess}>OK</Button>
              </div>
            ]}

          >
            <h5 >This transaction is complete </h5>
            {
              transferUser.type ?
                <Form>

                  <Form.Item label="Save beneficiary information">
                    <Checkbox onClick={this.handleSaveInfo} className="resText" />

                  </Form.Item>
                  {
                    errsave && !isSave && <Alert message={errsave} type="error" />

                  }
                  {this.state.ischeck &&

                    <div className="d-flex ">
                      <Input placeholder="Input Beneficiary" name="reminder"
                        value={reminder}
                        onFocus={this.onFocusSave}
                        onChange={this.onChangeName}
                      />
                      <Button loading={pend} type='primary' onClick={this.handleSaveBen}>Submit</Button>
                    </div>


                  }
                </Form>
                : " "
            }

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
    getBank: state.transaction.getBank,
    errsave: state.transaction.errsave
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
  receiverTransfer: (sentData) => dispatch(transactionActions.receiverTransfer(sentData)),
  // getUserCurrent: () => dispatch(transactionActions.getUserCurrent())
  linkBankAccount: (nameBank, content, amountMoney, receiver, typeSend) => dispatch(transactionActions.linkBankAccount(nameBank, content, amountMoney, receiver, typeSend)),
  verifyOTPLinkBank: (nameBank, receiver, amountMoney, content, typeSend, otp) => dispatch(transactionActions.verifyOTPLinkBank(nameBank, receiver, amountMoney, content, typeSend, otp)),
  saveReceiverInformation: (accountNumber, idBank, nameBeneficiary, nameRemind) => dispatch(transactionActions.saveReceiverInformation(accountNumber, idBank, nameBeneficiary, nameRemind)),
  getLinkBank: () => dispatch(transactionActions.getLinkBank()),

});
export default connect(mapStateToProps, mapDispatchToProps)(TransferOtherForm);


