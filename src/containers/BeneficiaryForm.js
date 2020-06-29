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
      idReceiver: ""
    };
  }
  componentDidMount = () => {
    const { receiverTransfer, getLinkBank } = this.props;
    receiverTransfer();
    getLinkBank();
  };
  showModalSave = () => {
    this.setState({ visible: true })
  }
  showModalCancelSave = () => {
    this.setState({ visible: false })
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
    console.log(newValue);
  }
  handleOk = () => {
    const { saveReceiverInformation, } = this.props;
    const { account, nameBank, nameReminder } = this.state;

    saveReceiverInformation(account, nameBank, nameReminder).then(res => {

      this.setState({

        account: " ",
        nameBank: ' ',
        nameRemind: ' ',
        visible: false,


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


    })



  }
  // this.setState({
  //   account: " ",
  //   nameBank: ' ',
  //   nameRem

  render() {
    const { isFistLoad, account, nameReminder, isLoadUpdate, isUpdate, showDeErr, showDeSuccess } = this.state;
    const { beneficiaries, errsave, pend, getBank, pendDelete, errDelete, successDelete, pendding } = this.props;
    console.log(this.props.beneficiaries);

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
          <Table dataSource={beneficiaries}
            pagination={{ pageSize: 10 }}
          >

            <Column title="Reminder Name " dataIndex="nameRemind" key="nameRemind" />
            <Column title="Number Account" dataIndex="numberAccount" key="numberAccount" />
            <Column title="Name Bank" dataIndex="linkedbank" key="linkedbank"
              render={(linkedbank) => (
                <p>{linkedbank.nameBank}</p>
              )}
            />
            <Column
              title="Action"
              key="action"
              dataIndex="_id"
              render={(_id) => (

                <div>
                  <EditTwoTone />
                  <DeleteTwoTone onClick={() => this.isShowDelete(_id,)} className="ml-4" />
                </div>
              )}
            />
          </Table>
          <Modal

            visible={this.state.visible}

            // okButtonProps={{ disabled:  }}
            // confirmLoading={pendding}
            onCancel={this.showModalCancelSave}

            footer={[
            ]}

          >  <div className="outletMain">
              <div className=" formName">ADD REMINDER</div>
              <Form className="myForm" {...layout} form={this.form} >
                {errsave && !isFistLoad && (
                  <Alert message={errsave} type="error" />

                )}

                <Form.Item label="account: " className="mt-5">
                  <Input type='Account' name="account " value={account} onChange={(e) => this.onChangeValue(e.target.value, 'account')}
                  />
                </Form.Item>
                <Form.Item label="Bank : "  >
                  <Select onChange={(value) => this.onChangeValue(value, 'nameBank')}>
                    <Option value="5ee353c900cceb8a5001c7cf">MPBank</Option>
                    {
                      getBank.map(item =>
                        <Option key={item._id} value={item._id}>{item.nameBank}</Option>
                      )
                    }
                  </Select>

                </Form.Item>
                <Form.Item label="  Reminder: " >
                  <Input name="nameReminder" value={nameReminder} onChange={(e) => this.onChangeValue(e.target.value, 'nameReminder')} />
                </Form.Item>

                <div style={{ marginLeft: '30%' }}>
                  {isLoadUpdate ?
                    <Button key="submit" type="primary" >
                      update
         </Button> :
                    <Button key="submit" type="primary" onClick={this.handleOk} loading={pend}>
                      Save
         </Button >
                  }
                  <Button className="ml-3" key="back" onClick={this.handleCancel}>
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
  successDelete: state.transaction.successDelete

  // saveInfoReceiver: state.stransaction.saveInfoReceiver
});

const mapDispatchToProps = (dispatch) => ({
  receiverTransfer: () => dispatch(transactionActions.receiverTransfer()),
  getLinkBank: () => dispatch(transactionActions.getLinkBank()),
  saveReceiverInformation: (accountNumber, idBank, nameRemind) => dispatch(transactionActions.saveReceiverInformation(accountNumber, idBank, nameRemind)),
  deleteReceiver: (idReceiver) => dispatch(transactionActions.deleteReceiver(idReceiver)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryForm);
