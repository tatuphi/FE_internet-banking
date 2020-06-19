import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button, Modal, Alert, } from "antd";
import { connect } from "react-redux";
import { userActions } from "action/user.action";
import { transactionActions } from "action/transaction.action";
import { Link } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


class TransferMoneyForm extends Component {
  formRef = React.createRef();
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
    this.setState({
      visible: true,
      isfistLoad: false
    });

  }
  handleSubmitMoney = () => {
    const { account, amount, content, pay, otp } = this.state
    const { verifyOTP } = this.props;
    let code = otp.trim();
    verifyOTP(account, amount, content, pay, code)
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
  handleSaveInfo = () => {
    const { saveReceiverInformation, transferUser, receiver } = this.props;
    let accnameReceiver = transferUser.userReceiver.accountName;
    const { account } = this.state;
    let idBank = "5ee353c900cceb8a5001c7cf";
    let nameRemind = ' ';
    saveReceiverInformation(account, accnameReceiver, idBank, nameRemind)
      .then(res => {
        console.log('TCL : ', res)

        this.setState({
          receiverInfo: [...receiver, { ...res.saveInfo }]
        })
      })
      .catch(() => console.log('err when save info'))
  }




  render() {
    const { penTran, transactionUser, showNextModal, receiver,
      errMessage, transferUser, pendding2, errMess, successModal, saveInfoReceiver, pend } = this.props;
    const { account, amount, content, otp, accBalance, accNumber, isfistLoad, isShow, issuccessModal } = this.state

    const activeEmail = account && amount.trim();
    let { receiverInfo } = this.state;
    receiverInfo = receiverInfo.length > 0 ? receiverInfo : [...receiver];
    console.log("receiver TCL ", receiver);


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

        <Form {...layout} name="control-ref" className="myForm"
          initialValues={{
            amount: amount,
          }}

        >
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
              {receiverInfo.map((item, index) =>
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
          <Form.Item label="Save beneficiary information">
            <Checkbox className="resText" />
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
              continue
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
              <div>
                <Button onClick={this.handleCancel}>cancel</Button>
                <Button onClick={this.showModal}>Back</Button>
              </div>
            ]}
          >


            <Form>
              <Form.Item className="resItem" label="Source account" name="username">
                <h6 name="username" className="resText mt-2">
                  {transactionUser.sender.accountNumber}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Name Receiver" name="nameReceiver">
                <h6 style={{ textTransform: "uppercase" }} name="email" className="resText mt-2">
                  {transactionUser.nameReceiver}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="account receiver:">
                <h6 name="emailOTP" className="resText mt-1">
                  {transactionUser.receiver}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Money:">
                <h6 name="emailOTP" className="resText mt-1">
                  {transactionUser.amountMoney}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="Type Send: ">
                <h5 name="emailOTP" className="resText">
                  {transactionUser.typeSend ? "payerr" : "payer"}
                </h5>
              </Form.Item>
              <Form.Item className="resItem" label="Content :">
                <h6 name="emailOTP" className="resText mt-1">
                  {transactionUser.content}
                </h6>
              </Form.Item>
              <Form.Item className="resItem" label="fee:">
                <h6 name="emailOTP" className="resText mt-1">
                  2200
                </h6>
              </Form.Item>
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

              <Form.Item colon={false} >

                <Button
                  className="btnSubmit"
                  htmlType="submit"
                  loading={penTran}
                  // disabled={!active}
                  type="primary"
                  onClick={this.handleSubmitMoney}

                >
                  Submit
            </Button>
              </Form.Item>
            </Form>




          </Modal>

        }
        {successModal && !issuccessModal &&
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
            {
              transferUser.type ? <div>
                <h5>Do you want to save receiver information for next times? </h5>
                <p>{saveInfoReceiver.msg}</p>
                {/* {
                  this.props.mess &&
                  <p>save success</p>
                } */}
                <Button type='primary' loading={pend} onClick={this.handleSaveInfo}>save</Button>

              </div>
                : ' '
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
  receiverTransfer: () => dispatch(transactionActions.receiverTransfer()),
  // getUserCurrent: () => dispatch(transactionActions.getUserCurrent())
  requestReceiver: (receiver, amountMoney, content, typeSend) => dispatch(transactionActions.requestReceiver(receiver, amountMoney, content, typeSend)),
  verifyOTP: (receiver, amountMoney, content, typeSend, otp) => dispatch(transactionActions.verifyOTP(receiver, amountMoney, content, typeSend, otp)),
  saveReceiverInformation: (accountNumber, accountName, idBank, nameRemind) => dispatch(transactionActions.saveReceiverInformation(accountNumber, accountName, idBank, nameRemind)),

});
export default connect(mapStateToProps, mapDispatchToProps)(TransferMoneyForm);
