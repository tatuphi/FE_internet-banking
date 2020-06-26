import React, { Component } from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import { deptActions } from 'action/dept.action';

import { transactionActions } from "action/transaction.action";
const columns = [
  {
    title: "Beneficiary Name",
    dataIndex: "beneficiaryName",
    width: 150,
  },
  {
    title: "Reminder Name",
    dataIndex: "reminderName",
    width: 150,
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    width: 150,
  },
  {
    title: "Bank Name",
    dataIndex: "bankName",
    width: 150,
  },
  {
    title: "Edit",
    dataIndex: "edit",
    width: 50,
  },
  {
    title: "Delete",
    dataIndex: "delete",
  },
];
const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    beneficiaryName: `Edward King ${i}`,
    reminderName: 32,
    accountNumber: `accountNumber ${i}`,
    bankName: `bankName ${i}`,
    edit: `edit`,
    delete: `delete`,
  });
}

class BeneficiaryForm extends Component {
  render() {
    return (
      <div className="outletMain">
        <div className="formName"> BENEFICIARY LIST SETTINGS</div>
        <Button className="btnSubmit">Add Beneficiary </Button>
        <div className="myForm">
          <Table
            className="border-left"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pendding: state.dept.pendding,
    listDept: state.dept.listDept,
    errMessage: state.dept.errMessage,
    errMess: state.transaction.errMess,
    transactionUser: state.transaction.transactionUser,
    penTran: state.transaction.penTran,
    pendding2: state.transaction.pendding,
    erMessage: state.transaction.errMessage,
    showNextModal: state.transaction.showNextModal,
    listReminder: state.dept.listReminder,
    successModal: state.transaction.successModal,

  };
};

const mapDispatchToProps = (dispatch) => ({
  showDeptRemind: () =>
    dispatch(deptActions.showDeptRemind()),
  requestDept: (numberAccount, amountMoney, content) => dispatch(deptActions.requestDept(numberAccount, amountMoney, content)),
  deleteReminder: (reminderId, content) =>
    dispatch(deptActions.deleteReminder(reminderId, content)),
  requestReceiver: (receiver, amountMoney, content, typeSend) => dispatch(transactionActions.requestReceiver(receiver, amountMoney, content, typeSend)),
  showDeptRemindUnPay: () =>
    dispatch(deptActions.showDeptRemindUnPay()),
  verifyOTP: (receiver, amountMoney, content, typeSend, otp, typeTransaction, idRemind) => dispatch(transactionActions.verifyOTP(receiver, amountMoney, content, typeSend, otp, typeTransaction, idRemind)),


});

export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryForm);

