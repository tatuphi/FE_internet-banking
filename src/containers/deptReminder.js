import React, { Component } from "react";
import { Button, Table, Tabs, Modal, Input, Form, Alert, message, Spin, } from "antd";
import {
    PlusOutlined, DeleteTwoTone,
} from '@ant-design/icons';
import { deptActions } from 'action/dept.action';
import { connect } from "react-redux";
import { transactionActions } from "action/transaction.action";
const ws = new WebSocket('ws://localhost:40510')


const { TabPane } = Tabs;
const { Column, } = Table;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


class DeptReminder extends Component {

    constructor(props) {
        super(props);
        const { listDept, listReminder } = this.props;
        console.log('listReminder', listReminder);
        this.state = {
            visible: false,
            account: '',
            money: ' ',
            content: ' ',
            isFistLoad: true,
            receiverInfo: [...listDept],
            txtName: " ",
            isDelete: false,
            reminderId: ' ',
            isLoadUpdate: false,
            isShow: true,
            isTransfer: false,
            listTranDept: [],
            isfistLoad: true,
            remList: [...listReminder],
            issuccessModal: true,
            otp: ' ',
            check: '',
            listTempDept: [],
            listTempRe: [],
            listSave: [],
            showDeErr: true,
            showDeSuccess: true,
            editList: []




        };
    }
    componentDidMount = () => {
        const { showDeptRemind, showDeptRemindUnPay } = this.props;
        showDeptRemind();
        showDeptRemindUnPay();


    }
    showModal = () => {
        this.setState({
            visible: true,
            account: " ",
            money: " ",
            content: "",
        });
    };
    isShowEdit = (idEvent, check) => {
        const { listDept, listReminder } = this.props;
        let dept = null;
        if (check === 'REMINDER') {
            dept = listReminder.find((ele) => ele._id === idEvent)

        } else {
            dept = listDept.find((ele) => ele._id === idEvent)

        }
        this.setState({
            visible: true,
            isLoadUpdate: true,
            account: dept.bankAccountReceiver,
            money: dept.amount,
            content: dept.content,
            check: check,
            editList: []

        });
    };
    handleOk = () => {
        const { requestDept, listDept } = this.props;
        let { account, money, content, listSave } = this.state;
        console.log(account, money, content);

        requestDept(account, money, content).then(res => {
            console.log('TCL : ', res)
            listSave = listSave.length > 0 ? [...listSave] : [...listDept]
            let save = [...listSave, { ...res.deptInfo }]
            this.setState({
                receiverInfo: save,
                account: " ",
                money: ' ',
                content: ' ',
                visible: false,
                listSave: save,
                isUpdate: true
            })
            message.success('This is a success message');

        })
            .catch((err) => console.log(err))
        this.setState({ isFistLoad: false });
    };
    handleCancel = () => {

        this.setState({
            visible: false,
        });
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        ;

    };
    onChangeName = (e) => {
        this.setState({
            txtName: e.target.value
        })
    }
    showDeleteConfirm = () => {
        const { deleteReminder } = this.props;
        let { txtName, reminderId, check } = this.state;
        deleteReminder(reminderId, txtName)
        if (check === 'REMINDER') {
            this.setState({ isUpdate: false, showDeErr: false, txtName: " ", showDeSuccess: false })
        } else {
            this.setState({ isUpdateRe: false, showDeErr: false, txtName: " ", showDeSuccess: false })
        }


    }
    isShowDelete = (reminderId, check) => {
        console.log('1', reminderId);
        this.setState({
            isDelete: true,
            reminderId: reminderId,
            check: check,



        })
    }
    isCancel = () => {
        this.setState({ isDelete: false, showDeErr: true, showDeSuccess: true })
    }
    transferStatus = (list) => {
        console.log('1', list)
        this.setState({

            listTranDept: list

        })

        const { requestReceiver } = this.props;
        let content = '';
        let pay = true;
        requestReceiver(list.bankAccountSender, list.amount, content, pay)

        this.setState({
            isTransfer: true,
            isfistLoad: true,

        })

    }
    totalMoney = (amount, type) => {
        let m = null;
        if (type === true) {
            m = +amount + 2200;
        }
        else {
            m = +amount;
        }

        return `${m} VND`;

    }
    handleCancelTransfer = () => {
        this.setState({
            isTransfer: false
        })
    }
    handleSubmitMoney = () => {
        const { listTranDept, otp, remList } = this.state
        let { editList } = this.state;
        const { verifyOTP, listReminder } = this.props;
        let code = otp.trim();
        let typeTransaction = 'INDEPT'
        let content = 'Transfer Dept ';
        let pay = true;
        console.log('2', listTranDept)
        console.log('3', remList);

        verifyOTP(listTranDept.bankAccountSender, listTranDept.amount, content, pay, code, typeTransaction, listTranDept._id)
        editList = editList.length > 0 ? [...editList] : [...listReminder]
        let send = editList.find((e) => e._id === listTranDept._id);
        const index = editList.indexOf(send);
        console.log('test', send);
        send.status = 'PAYED';
        this.setState({
            remList: [
                ...editList.slice(0, index),
                send,
                ...editList.slice(index + 1, editList.length),
            ],
            issuccessModal: false,
            isShow: false,
            otp: '',
            isUpdateRe: true
        });



    }

    render() {
        const { listDept, errMessage, pendding, errMess,
            transactionUser, penTran, pendding2, successModal
            , erMessage, showNextModal, listReminder, penDelete, errDelete, isDeleteSuccess } = this.props;
        console.log('1', listReminder)
        const { content, account,
            money, isFistLoad, txtName,
            isLoadUpdate, isShow, otp, isfistLoad, isUpdate, showDeErr, showDeSuccess, isUpdateRe, issuccessModal } = this.state;
        // const isDisable = money && account && content.trim();
        let { remList, receiverInfo } = this.state;
        receiverInfo = isUpdate ? [...receiverInfo] : [...listDept]
        remList = isUpdateRe ? [...remList] : [...listReminder];
        console.log('h', errMessage);
        return (
            <div className="outletMain" >
                <div className="formName"> DEPTREMIND LIST SETTINGS</div>
                <Button type="primary" shape="round" onClick={this.showModal}> <PlusOutlined /> Add DeptRemind </Button>
                <div className="mt-4">
                    {pendding2 && (
                        <Spin

                            size="large"
                            style={{
                                position: 'absolute',
                                zIndex: '3000',
                                margin: '30%'
                            }}
                        >
                            {/* {' '} */}
                        </Spin>
                    )}
                    <div className="mt-4">
                        {pendding && (
                            <Spin

                                size="large"
                                style={{
                                    position: 'absolute',
                                    zIndex: '3000',
                                    margin: '20%'
                                }}
                            >
                                {/* {' '} */}
                            </Spin>
                        )}
                    </div>
                    <Tabs type="card">

                        <TabPane tab="List other remind" key="1">
                            <div>
                             
                            </div>


                        </TabPane>
                        <TabPane tab="List dept Create by myself" key="2">

                            <div>

                                <Table dataSource={receiverInfo}
                                    pagination={{ pageSize: 10 }}
                                >

                                    <Column title="Account Number receiver dept" dataIndex="bankAccountReceiver" key="bankAccountReceiver" />
                                    <Column title="Amount money" dataIndex="amount" key="amount" />
                                    <Column title="Status" dataIndex="status" key="status"

                                    />
                                    <Column
                                        title="Action"
                                        key="action"
                                        dataIndex="_id"
                                        render={(_id) => (
                                            <div>
                                                {/* <EditTwoTone onClick={() => this.isShowEdit(_id, 'REMIND')} /> */}
                                                <DeleteTwoTone onClick={() => this.isShowDelete(_id, 'REMIND')} className="ml-4" />
                                            </div>
                                        )}
                                    />
                                </Table>
                            </div>

                        </TabPane>

                    </Tabs>,
                </div>
                {erMessage && !isfistLoad && (
                    message.error(erMessage)

                )}

                <Modal

                    visible={this.state.visible}

                    // okButtonProps={{ disabled:  }}
                    // confirmLoading={pendding}
                    onCancel={this.handleCancel}

                    footer={[
                    ]}

                >  <div className="outletMain">
                        <div className=" formName">ADD REMINDER</div>
                        <Form className="myForm" {...layout} form={this.form} >
                            {errMessage && !isFistLoad && (
                                <Alert message={errMessage} type="error" />

                            )}

                            <Form.Item label=" Reminder: " className="mt-5">
                                <Input type='number' name="account" value={account} onChange={this.onChange} />
                            </Form.Item>
                            <Form.Item label=" Money : " >
                                <Input type='number' name="money" value={money} onChange={this.onChange} />
                            </Form.Item>
                            <Form.Item label="Content: " >
                                <Input name="content" value={content} onChange={this.onChange} />
                            </Form.Item>

                            <div style={{ marginLeft: '30%' }}>
                                {isLoadUpdate ?
                                    <Button key="submit" type="primary" >
                                        update
                             </Button> :
                                    <Button key="submit" type="primary" onClick={this.handleOk} loading={pendding}>
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
                    // okText="yes"
                    // okType='danger'
                    // cancelText='No'

                    // confirmLoading={confirmLoading}

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
                                isDeleteSuccess && !showDeSuccess &&
                                < h5 style={{ color: 'green' }}>Delete success</ h5>
                            }
                            <Form.Item label=" content: " >
                                <Input value={txtName} onChange={this.onChangeName}></Input>
                            </Form.Item>
                            <div style={{ marginLeft: '35%' }}>
                                <Button type='ghost' loading={penDelete} onClick={this.showDeleteConfirm}>Yes</Button>
                                <Button className="ml-3" type='default' onClick={this.isCancel}>No</Button>
                            </div>
                        </Form>


                    </div>
                </Modal>
               
                {
                    showNextModal && <Modal
                        title="Transfer Dept"
                        visible={this.state.isTransfer}

                        style={{ top: '10px' }}
                        onCancel={this.handleCancelTransfer}


                        footer={
                            null
                        }
                    >
                        <div className="outletMain">
                            <div className=" formName">TRANSACTION INFORMATION</div>

                            <Form style={{ fontWeight: 'bold', fontSize: '13px' }}>
                                <div className='row'>
                                    <div className='col'>Source account</div>
                                    <div className='col'> {this.state.listTranDept.bankAccountReceiver}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Account receiver:</div>
                                    <div className='col'> {transactionUser.receiver}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Name receiver:</div>
                                    <div className='col'> {transactionUser.nameReceiver}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Amount Money:</div>
                                    <div className='col'>  {transactionUser.amountMoney}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Type Send:</div>
                                    <div className='col'>   {transactionUser.typeSend ? "Payer" : "Payee"}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Content:</div>
                                    <div className='col'> {transactionUser.content}</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>Fee:</div>
                                    <div className='col'>  2200 VND</div>
                                </div>
                                <hr></hr>
                                <div className="row" style={{ fontSize: '20px', fontWeight: 'bolder' }}>
                                    <div className="col">Total:</div>
                                    <div className="col"> {this.totalMoney(transactionUser.amountMoney, transactionUser.typeSend)}</div>
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
                                    <div>
                                        <Button onClick={this.handleCancelTransfer}>cancel</Button>
                                        <Button onClick={this.showModal}>Back</Button>
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
                        width={300}
                        footer={[
                            <div>
                                {/* <Link to="/">
                  <Button type='primary'>Back home</Button>
                </Link> */}
                                <Button type='primary' className="ml-4" onClick={this.showSuccess}>continue</Button>
                            </div>
                        ]}

                    >
                        <div style={{ color: 'white', height: '40px', background: 'green' }} >This transaction is complete </div>
                        {/* {
              transferUser.type ? <div>
                <h5>Do you want to save receiver information for next times? </h5>
                <p>{saveInfoReceiver.msg}</p>
            
              </div>
                : ' '
            } */}
                    </Modal>
                }
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
        penDelete: state.dept.penDelete,
        errDelete: state.dept.errDelete,
        isDeleteSuccess: state.dept.isDeleteSuccess

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
    updateReminder: (sentData) => dispatch(transactionActions.updateReminder(sentData)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DeptReminder);

