import React, { Component } from "react";
import { Button, Table } from "antd";
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

export default BeneficiaryForm;
