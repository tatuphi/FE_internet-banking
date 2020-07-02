import React, { Component } from "react";
import { Button, Table, Form, Input, Modal, Alert, Select, message, Spin } from "antd";
import { connect } from "react-redux";
import {
  PlusOutlined, DeleteTwoTone, EditTwoTone
} from '@ant-design/icons';
import { userActions } from "action/user.action";
import { transactionActions } from "action/transaction.action";
import { transactionConstants } from "constants";
const { Column, } = Table;

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
class BeneficiaryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.beneficiaries || [],
      account: '',
      money: ' ',
      nameReminder: ' ',
      isLoadUpdate: false,
      isFistLoad: true,
      visible: false,
      nameBank: " ",
      listSave: [],
      receiverInfo: [],
      isDelete: false,
      showDeErr: true,
      showDeSuccess: true,
      idReceiver: "",
      isEdit: true,
      beneficiary: ''
    };
  }
  componentDidMount = () => {
    const { receiverTransfer, getLinkBank } = this.props;
    receiverTransfer();
    getLinkBank();
  };
  showModalSave = () => {
    this.setState({ visible: true, isFistLoad: true, isLoadUpdate: false })
  }
  showModalCancelSave = () => {
    this.setState({
      visible: false,
      isEdit: false,
      account: " ",
      nameBank: ' ',
      nameRemind: ' ',
      beneficiary: "",
    })
  }
  renderBeneficiary = (data) => {
    const newData = data.map((item) => ({
      key: item._id,
      beneficiaryName: item.nameAccount,
      reminderName: item.nameRemind,
      accountNumber: item.numberAccount,
      bankName: item.linkedbank.nameBank,
      edit: false,
      delete: item.isDelete,
    }));
    return newData;
  };
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,

    });


  }
  onFocusEr = () => {
    this.setState({
      isFistLoad: true
    })
  }
  handleOk = () => {
    const { saveReceiverInformation, beneficiaries } = this.props;
    const { account, nameBank, nameReminder, beneficiary } = this.state;
    let { listSave } = this.state;
    saveReceiverInformation(account, nameBank, beneficiary, nameReminder).then(res => {
      console.log("res", res)
      listSave = listSave.length > 0 ? [...listSave] : [...beneficiaries];
      let data = { ...res.saveInfo, linkedbank: res.link };
      let save = [...listSave, { ...data }]
      this.setState({
        account: " ",
        nameBank: ' ',
        nameRemind: ' ',
        visible: false,
        isUpdate: true,
        listSave: save,
        receiverInfo: save,
        beneficiary: "",
      })
      message.success('This is a success message');

    })
      .catch((err) => console.log(err))
    this.setState({ isFistLoad: false });

  }
  isShowDelete = (idReceiver) => {
    this.setState({
      idReceiver: idReceiver,
      isDelete: true,

    })
  }
  isCancel = () => {
    this.setState({
      isDelete: false, showDeErr: true,
      showDeSuccess: true,
    })


  }
  showDeleteConfirm = () => {
    const { deleteReceiver } = this.props;
    const { idReceiver } = this.state;
    deleteReceiver(idReceiver);

    this.setState({
      showDeErr: false,
      showDeSuccess: false,
      isUpdate: false,

    })
  }
  isShowEdit = (idReceiver) => {
    const { beneficiaries } = this.props;
    let item = beneficiaries.find(e => e._id === idReceiver);

    this.setState({
      idReceiver: idReceiver,
      account: item.numberAccount,
      nameBank: item.linkedbank._id,
      nameReminder: item.nameRemind,
      visible: true,
      isLoadUpdate: true,
      beneficiary: item.nameBeneficiary

    })

  }
  showEditReceiver = () => {
    const { idReceiver, account, nameBank, nameReminder, beneficiary } = this.state;
    const { editReceiverInformation, beneficiaries } = this.props;
    let { listSave } = this.state;
    editReceiverInformation(idReceiver, account, nameBank, beneficiary, nameReminder).then(res => {
      console.log("res", res)
      listSave = listSave.length > 0 ? [...listSave] : [...beneficiaries];
      let data = { ...res.receiver, linkedbank: res.link };
      let send = listSave.find((e) => e._id === idReceiver);
      const index = listSave.indexOf(send);
      send = data;
      let save = [
        ...listSave.slice(0, index),
        send,
        ...listSave.slice(index + 1, listSave.length)
      ];
      this.setState({
        account: " ",
        nameBank: ' ',
        nameRemind: ' ',
        visible: false,
        isUpdate: true,
        listSave: save,
        receiverInfo: save,
      })

      message.success('This is a success message');

    })
      .catch((err) => console.log(err))
    this.setState({ isEdit: false })
  }


  render() {
    const { isFistLoad, account, nameReminder, isLoadUpdate, isUpdate, nameBank,
      showDeErr, showDeSuccess, isEdit, beneficiary } = this.state;
    const { beneficiaries, errsave, pend, getBank,
      pendDelete, errDelete, successDelete, pendding, pendEdit, errEdit } = this.props;

    let { receiverInfo } = this.state;
    receiverInfo = isUpdate ? [...receiverInfo] : [...beneficiaries]
    console.log("receiverInfo", receiverInfo);
    // const data = [];


    return (

      <div className="outletMain">
        <div className="formName"> BENEFICIARY LIST SETTINGS</div>
        <Button type="primary" shape="round" onClick={this.showModalSave}> <PlusOutlined /> Add Beneficiary </Button>
        <div className=" mt-3">
          <div>
            {pendding && (
              <Spin

                size="large"
                style={{
                  position: 'absolute',
                  zIndex: '3000',
                  marginLeft: '40%',
                  marginTop: "10%",
                  fontSize: '100px'
                }}
              >
                {/* {' '} */}
              </Spin>
            )}
          </div>
          <Table dataSource={receiverInfo}
            pagination={{ pageSize: 10 }}
          >
            <Column title="Name Beneficiary " dataIndex="nameBeneficiary" key="nameBeneficiary" />
            <Column title="Reminder Name " dataIndex="nameRemind" key="nameRemind" />
            <Column title="Number Account" dataIndex="numberAccount" key="numberAccount" />
            <Column title="Name Bank" dataIndex="linkedbank" key="linkedbank"
              render={(linkedbank) => (
                linkedbank &&
                <p>{linkedbank.nameBank}</p>
              )}
            />
            <Column
              title="Action"
              key="action"
              dataIndex="_id"
              render={(_id) => (

                <div>
                  <EditTwoTone onClick={() => this.isShowEdit(_id)} />
                  <DeleteTwoTone onClick={() => this.isShowDelete(_id)} className="ml-4" />
                </div>
              )}
            />
          </Table>
          <Modal

            visible={this.state.visible}

            onCancel={this.showModalCancelSave}

            footer={[
            ]}

          >  <div className="outletMain">
              <div className=" formName">ADD REMINDER</div>
              <Form className="myForm" {...layout} form={this.form} >
                {errsave && !isFistLoad && (
                  <Alert message={errsave} type="error" />

                )}
                {errEdit && !isEdit && (
                  <Alert message={errEdit} type="error" />

                )}

                <Form.Item label="account: " className="mt-5">
                  <Input type='Account' name="account " onFocus={this.onFocusEr}
                    value={account} onChange={(e) => this.onChangeValue(e.target.value, 'account')}
                  />
                </Form.Item>
                <Form.Item label="Bank : "  >
                  <Select onChange={(value) => this.onChangeValue(value, 'nameBank')} defaultValue={nameBank}>
                    {
                      getBank.map(item =>
                        <Option key={item._id} value={item._id}>{item.nameBank}</Option>
                      )
                    }
                  </Select>

                </Form.Item>
                <Form.Item label="  Reminder: " >
                  <Input name="nameReminder" value={nameReminder} onFocus={this.onFocusEr}
                    onChange={(e) => this.onChangeValue(e.target.value, 'nameReminder')} />
                </Form.Item>
                <Form.Item label="  beneficiary: " >
                  <Input name="beneficiary" value={beneficiary} onFocus={this.onFocusEr}
                    onChange={(e) => this.onChangeValue(e.target.value, 'beneficiary')} />
                </Form.Item>

                <div style={{ marginLeft: '30%' }}>
                  {isLoadUpdate ?
                    <Button key="submit" type="primary" loading={pendEdit} onClick={this.showEditReceiver} >
                      update
         </Button> :
                    <Button key="submit" type="primary" onFocus={this.onFocusEr}
                      onClick={this.handleOk} loading={pend}>
                      Save
         </Button >
                  }
                  <Button className="ml-3" key="back" onClick={this.showModalCancelSave}>
                    Return
        </Button>,
       </div>
              </Form>
            </div>
          </Modal>
          <Modal
            visible={this.state.isDelete}
            onCancel={this.isCancel}
            footer={[
            ]}
          >
            <div className="outletMain">
              <div className=" formName">DELETE REMINDER</div>
              <Form className="myForm" {...layout} form={this.form} >
                {
                  errDelete && !showDeErr &&
                  < h5 style={{ color: 'red' }}>{errDelete}</ h5>
                }
                {
                  successDelete && !showDeSuccess &&
                  < h5 style={{ color: 'green' }}>Delete success</ h5>
                }

                <div style={{ marginLeft: '35%' }}>
                  <Button type='ghost' loading={pendDelete} onClick={this.showDeleteConfirm}>Yes</Button>
                  <Button className="ml-3" type='default' onClick={this.isCancel}>No</Button>
                </div>
              </Form>


            </div>
          </Modal>

        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  beneficiaries: state.transaction.receiver,
  pendding: state.transaction.pendding,
  pend: state.transaction.pend,
  errsave: state.transaction.errsave,
  getBank: state.transaction.getBank,
  pendDelete: state.transaction.pendDelete,
  errDelete: state.transaction.errDelete,
  successDelete: state.transaction.successDelete,
  pendEdit: state.transaction.pendEdit,
  editReceiver: state.transaction.editReceiver,
  errEdit: state.transaction.errEdit,
  successEdit: state.transaction.successEdit,


});

const mapDispatchToProps = (dispatch) => ({
  receiverTransfer: () => dispatch(transactionActions.receiverTransfer()),
  getLinkBank: () => dispatch(transactionActions.getLinkBank()),
  saveReceiverInformation: (accountNumber, idBank, beneficiary, nameRemind) => dispatch(transactionActions.saveReceiverInformation(accountNumber, idBank, beneficiary, nameRemind)),
  deleteReceiver: (idReceiver) => dispatch(transactionActions.deleteReceiver(idReceiver)),
  editReceiverInformation: (idReceiver, account, nameBank, beneficiary, nameReminder) => dispatch(transactionActions.editReceiverInformation(idReceiver, account, nameBank, beneficiary, nameReminder))
});
export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryForm);
