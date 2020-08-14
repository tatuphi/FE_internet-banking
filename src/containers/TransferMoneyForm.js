import React, { Component } from "react";
import { Form, Input, Select, Checkbox, Button, Modal, Alert } from "antd";
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

    const { accountNumber, receiver } = this.props;
    this.state = {
      account: "",
      amount: "",
      content: " ",
      pay: true,
      visible: false,
      otp: " ",
      accNumber:
        accountNumber && accountNumber.length > 0
          ? accountNumber[0].accountNumber
          : "",
      accBalance:
        accountNumber && accountNumber.length > 0
          ? accountNumber[0].currentBalance
          : "",
      isShow: true,
      isfistLoad: true,
      issuccessModal: true,
      isModal: false,
      accnameReceiver: " ",
      receiverInfo: [...receiver],
      reminder: "",
      ischeck: false,
      isSave: true,
      listTemp: [],
    };
  }
  componentDidMount = () => {
    const { getAccountNumber, receiverTransfer } = this.props;
    let type = "Credit";
    let sentData = {};
    let a = "mpbank";
    let idBank = "5ee353c900cceb8a5001c7cf";
    sentData.type = a;
    sentData.idBank = idBank;
    getAccountNumber(type);
    receiverTransfer(sentData);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.accountNumber &&
      this.props.accountNumber.length !== 0 &&
      !prevState.accNumber
    ) {
      this.setState({
        accBalance: this.props.accountNumber[0].currentBalance,
        accNumber: this.props.accountNumber[0].accountNumber,
      });
    }

    if (
      this.props.transferUser.userSender &&
      this.props.transferUser.userSender.currentBalance !== prevState.accBalance
    ) {
      this.setState({
        accBalance: this.props.transferUser.userSender.currentBalance,
      });
    }
  };

  onGenderChange = (value) => {
    // this.formRef.current.setFieldsValue({
    //   account: value,
    // });

    console.log("change value ", value);
    this.setState({ account: value });
  };
  onChangeAcount = (value) => {
    this.setState({
      account: value,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangePayer = (value) => {
    let check = null;
    if (value === "true") {
      check = true;
    } else {
      check = false;
    }
    this.setState({
      pay: check,
    });
    console.log(this.state.pay);
  };
  handleSubmit = () => {
    const { account, amount, content, pay } = this.state;
    const { requestReceiver } = this.props;
    requestReceiver(account, amount, content, pay);
    this.setState({
      visible: true,
      isfistLoad: false,
    });
  };
  handleSaveBen = () => {
    const { account, reminder } = this.state;
    const { saveReceiverInformation } = this.props;

    let idBank = "5ee353c900cceb8a5001c7cf";
    let nameAccount = "";

    saveReceiverInformation(account, idBank, nameAccount, reminder);

    this.setState({
      isSave: false,
    });
  };
  onFocusSave = () => {
    this.setState({ isSave: true });
  };
  handleSubmitMoney = () => {
    const { account, amount, content, pay, otp } = this.state;
    const { verifyOTP } = this.props;
    let code = otp.trim();
    let typeTransaction = "TRANSFER";
    let nameBank = "MPBank";
    verifyOTP(account, amount, content, pay, code, typeTransaction, nameBank);
    this.setState({
      issuccessModal: false,
      isModal: true,
      isShow: false,
    });
  };
  showModal = () => {
    this.setState({
      visible: false,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      account: "",
      amount: "",
      content: " ",
      pay: false,
      visible: false,
      otp: " ",
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      amount: " ",
      content: " ",
      otp: " ",
      account: " ",
    });
  };
  showSuccess = () => {
    this.setState({
      isModal: false,
      amount: " ",
      account: " ",
      otp: " ",
      content: "",
      visible: false,
      isShow: true,
      isfistLoad: true,
      issuccessModal: true,
      accnameReceiver: " ",
    });
  };
  onFocus = () => {
    this.setState({
      isShow: true,
    });
  };
  handleSaveInfo = () => {
    let { ischeck } = this.state;
    this.setState({ ischeck: !ischeck });
  };
  totalMoney = (amount, type) => {
    let m = null;
    if (type === true) {
      m = +amount + 2200;
    } else {
      m = +amount;
    }

    return `${m} VND`;
  };
  onFocusAccount = () => {
    this.setState({
      isfistLoad: true,
    });
  };

  onChangeName = (e) => {
    this.setState({ reminder: e.target.value });
  };

  render() {
    const {
      penTran,
      transactionUser,
      showNextModal,
      receiver,
      errsave,
      errMessage,
      pendding2,
      errMess,
      successModal,
      pend,
    } = this.props;
    const {
      account,
      amount,
      content,
      otp,
      accBalance,
      isSave,
      accNumber,
      isfistLoad,
      isShow,
      issuccessModal,
      reminder,
    } = this.state;

    const activeEmail = account && amount.trim();
    // let { receiverInfo } = this.state;
    // receiverInfo = isUpdate ? [...receiverInfo] : [...receiver];

    var formatMoney = new Intl.NumberFormat();

    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <span>VND</span>
      </Form.Item>
    );

    return (
      <div className="outletMain">
        <div className="formName"> TRANSFER MONEY TO BENEFICIARY AT MPBANK</div>

        <hr />
        <div className="titlePart">SOURCE INFORMATION</div>
        <hr />

        <Form className="myForm" {...layout} form={this.form}>
          <Form.Item label="Source Account" name="username">
            <p className="resText mt-2">{accNumber}</p>
          </Form.Item>
          <Form.Item
            className="resItem"
            label="Current Balance"
            name="currentBalance"
          >
            <span className="resText">
              {" "}
              {formatMoney.format(accBalance)} VNĐ
            </span>
          </Form.Item>
        </Form>

        <div className="titlePart">TRANSFER INFORMATION</div>
        <hr />

        <Form {...layout} name="control-ref" className="myForm">
          <div className="titlePart">BENEFICIARY INFORMATION</div>
          <hr />
          {errMessage && !isfistLoad && (
            <Alert message={errMessage} type="error" />
          )}

          <Form.Item className=" mt-3" name="Receiver" label="Receiver">
            <Select
              placeholder="List Beneficiary"
              onChange={this.onGenderChange}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {receiver.map((item, index) => (
                <Option key={index} value={item.numberAccount}>
                  <div className="row">
                    <div className="col">{item.nameRemind}</div>
                    <div className="col">{item.nameBeneficiary}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Account Number"
            // name="account"
            rules={[
              {
                required: true,
                message: "Please input your account number",
              },
            ]}
          >
            <Input
              name="account"
              type="number"
              value={account}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item label="Save Beneficiary Information">
            <Checkbox onClick={this.handleSaveInfo} className="resText" />
          </Form.Item>
          {errsave && !isSave && <Alert message={errsave} type="error" />}
          {this.state.ischeck && (
            <Form.Item label="Beneficiary Name" className="mt-3">
              <div className="d-flex ">
                <Input
                  placeholder="Input Beneficiary"
                  name="reminder"
                  value={reminder}
                  onFocus={this.onFocusSave}
                  onChange={this.onChangeName}
                />
                <Button
                  loading={pend}
                  type="primary"
                  onClick={this.handleSaveBen}
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          )}
          <div className="titlePart">TRANSACTION INFORMATION</div>
          <hr />
          <Form.Item
            label="Transfer Amount"
            rules={[
              {
                required: true,
                message: "Please input your amount money",
              },
            ]}
          >
            <Input
              addonAfter={prefixSelector}
              placeholder="Input amount"
              name="amount"
              value={amount}
              type="number"
              onChange={this.onChange}
              onFocus={this.onFocusAccount}
            />
          </Form.Item>

          <Form.Item label="Transfer Content">
            <Input
              placeholder="Input amount"
              name="content"
              value={content}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label="Transfer Fee">
            <Select onChange={this.onChangePayer} defaultValue="Payer">
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
              Continue
            </Button>
          </Form.Item>
        </Form>

        {showNextModal && (
          <Modal
            visible={this.state.visible}
            style={{ top: "10px" }}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <div>
              <div className=" formName">TRANSACTION INFORMATION</div>

              <Form.Item
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                OTP has just been sent to your email !!!
              </Form.Item>
              <hr></hr>

              <Form style={{ fontWeight: "bold", fontSize: "13px" }}>
                <div className="row">
                  <div className="col">Source Account:</div>
                  <div className="col">
                    {" "}
                    {transactionUser.sender.accountNumber}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Account Receiver:</div>
                  <div className="col"> {transactionUser.receiver}</div>
                </div>
                <div className="row">
                  <div className="col">Name Receiver:</div>
                  <div className="col" style={{ textTransform: "uppercase" }}>
                    {" "}
                    {transactionUser.nameReceiver}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Amount Money:</div>
                  <div className="col">
                    {" "}
                    {formatMoney.format(transactionUser.amountMoney)}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Type Send:</div>
                  <div className="col">
                    {" "}
                    {transactionUser.typeSend ? "Payer" : "Payee"}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Content:</div>
                  <div className="col"> {transactionUser.content}</div>
                </div>
                <div className="row">
                  <div className="col">Fee Transaction:</div>
                  <div className="col"> 2,200 VND</div>
                </div>
                <hr></hr>
                <div
                  className="row"
                  style={{ fontSize: "20px", fontWeight: "bolder" }}
                >
                  <div className="col">Total:</div>
                  <div className="col">
                    {" "}
                    {this.totalMoney(
                      transactionUser.amountMoney,
                      transactionUser.typeSend
                    )}
                  </div>
                </div>
              </Form>
              <Form>
                {errMess && !isShow && <Alert message={errMess} type="error" />}
                <Form.Item
                  className="mt-2"
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
                    style={{ width: "80%" }}
                    placeholder="Input the OTP"
                  />
                </Form.Item>
                <div className="d-flex">
                  <Form.Item colon={false} style={{ marginLeft: "20%" }}>
                    <Button
                      className="btnSubmit"
                      htmlType="submit"
                      loading={penTran}
                      type="primary"
                      onClick={this.handleSubmitMoney}
                      shape="round"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <div>
                    <Button
                      type="primary"
                      shape="round"
                      className="ml-3"
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      shape="round"
                      className="ml-3"
                      onClick={this.showModal}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Modal>
        )}
        {successModal && !issuccessModal && (
          <Modal
            visible={this.state.isModal}
            onCancel={this.showSuccess}
            width={300}
            bodyStyle={{ background: "#1e860e", borderRadius: "5px" }}
            footer={null}
          >
            <div>
              <h6 style={{ color: "white", fontWeight: "bolder" }}>
                This transaction is complete{" "}
              </h6>
              <Button
                type="primary"
                shape="round"
                style={{ width: "100%", marginTop: "5%" }}
                onClick={this.showSuccess}
              >
                OK
              </Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.user.pendding,
    accountNumber: state.user.accountNumber,
    receiver: state.transaction.receiver,
    pendd: state.transaction.pendd,
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
    errsave: state.transaction.errsave,
    penTran: state.transaction.penTran,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAccountNumber: (typeAccount) =>
    dispatch(userActions.getAccountNumber(typeAccount)),
  receiverTransfer: (sentData) =>
    dispatch(transactionActions.receiverTransfer(sentData)),
  requestReceiver: (receiver, amountMoney, content, typeSend) =>
    dispatch(
      transactionActions.requestReceiver(
        receiver,
        amountMoney,
        content,
        typeSend
      )
    ),
  verifyOTP: (
    receiver,
    amountMoney,
    content,
    typeSend,
    otp,
    typeTransaction,
    nameBank
  ) =>
    dispatch(
      transactionActions.verifyOTP(
        receiver,
        amountMoney,
        content,
        typeSend,
        otp,
        typeTransaction,
        nameBank
      )
    ),
  saveReceiverInformation: (
    accountNumber,
    idBank,
    nameBeneficiary,
    nameRemind
  ) =>
    dispatch(
      transactionActions.saveReceiverInformation(
        accountNumber,
        idBank,
        nameBeneficiary,
        nameRemind
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(TransferMoneyForm);
