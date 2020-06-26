import React, { Component } from "react";
import { Button, Table } from "antd";
import { connect } from "react-redux";
import { userActions } from "action/user.action";
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
    width: 100,
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

class BeneficiaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.beneficiaries || [],
    };
  }
  componentDidMount = () => {
    const { getBeneficiary } = this.props;
    getBeneficiary();
  };

  renderBeneficiary = (data) => {
    const newData = data.map((item) => ({
      key: item._id,
      beneficiaryName: item.nameAccount,
      reminderName: item.nameRemind,
      accountNumber: item.numberAccount,
      bankName: item.idBank,
      edit: false,
      delete: item.isDelete,
    }));
    return newData;
  };

  render() {
    const { data } = this.state;
    console.log(this.props.beneficiaries);
    const newData = this.renderBeneficiary(this.props.beneficiaries);
    // const data = [];

    return (
      <div className="outletMain">
        <div className="formName"> BENEFICIARY LIST SETTINGS</div>
        <Button className="btnSubmit">Add Beneficiary </Button>
        <div className="myForm">
          <Table
            style={{ marginLeft: "-10%" }}
            columns={columns}
            dataSource={newData}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiaries: state.user.beneficiaries,
});

const mapDispatchToProps = (dispatch) => ({
  getBeneficiary: () => dispatch(userActions.getBeneficiary()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryForm);
