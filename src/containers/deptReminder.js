import React, { Component } from "react";
import { Button, Table, Tabs, Modal, Input, Form, Alert, message, Spin } from "antd";
import {
    PlusOutlined, EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined

} from '@ant-design/icons';
import { deptActions } from 'action/dept.action';
import { connect } from "react-redux";
import { transactionActions } from "action/transaction.action";
const ws = new WebSocket('ws://localhost:40510')
const { confirm } = Modal

const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;
const columns = [
    {
        title: "Account Number",
        dataIndex: "accountNumber",
        width: 150,
    },
    {
        title: "amount Money",
        dataIndex: "amount",
        width: 150,
    },
    {
        title: "status",
        dataIndex: "status",
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
            confirmLoading: false,
            isLoadUpdate: false,
            isShow: true,
            isTransfer: false,
            listTranDept: [],
            isfistLoad: true,
            remList: [...listReminder],
            issuccessModal: true,
            otp: ' ',
            check: ''



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
    isShowEdit = (idEvent) => {
        const { listDept } = this.props;
        let dept = listDept.find((ele) => ele._id === idEvent)
        this.setState({
            visible: true,
            isLoadUpdate: true,
            account: dept.bankAccountReceiver,
            money: dept.amount,
            content: dept.content,

        });
    };
    handleOk = () => {
        const { requestDept, listDept } = this.props;
        const { account, money, content } = this.state;
        console.log(account, money, content);

        requestDept(account, money, content).then(res => {
            console.log('TCL : ', res)

            this.setState({
                receiverInfo: [...listDept, { ...res.deptInfo }]
            })
        })
            .catch(() => console.log('err when save info'))
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
        const { deleteReminder, listDept, listReminder } = this.props;
        const { txtName, reminderId, check } = this.state;
        this.setState({ confirmLoading: true, })
        deleteReminder(reminderId, txtName);
        if (check === 'REMINDER') {
            let listReminde = listReminder.filter((e) => e._id !== reminderId && (s => s.isDelete === false));
            setTimeout(() => {
                this.setState({
                    isDelete: false,
                    confirmLoading: false,
                    remList: listReminde,
                    txtName: ' '
                });
            }, 3000);
        } else {
            let receiver = listDept.filter((e) => e._id !== reminderId && (s => s.isDelete === false));
            setTimeout(() => {
                this.setState({
                    isDelete: false,
                    confirmLoading: false,
                    receiverInfo: receiver,
                    txtName: ' '
                });
            }, 3000);
        }





    }
    isShowDelete = (reminderId, check) => {
        console.log('remind', check);
        this.setState({
            isDelete: true,
            reminderId: reminderId,
            check: check

        })
    }
    isCancel = () => {
        this.setState({ isDelete: false })
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
        const { verifyOTP, listReminder } = this.props;
        let code = otp.trim();
        let typeTransaction = 'INDEPT'
        let content = ' ';
        let pay = true;
        console.log('2', listTranDept)
        console.log('3', remList);
        verifyOTP(listTranDept.bankAccountSender, listTranDept.amount, content, pay, code, typeTransaction, listTranDept._id)
        let list = [...listReminder];
        let send = list.find((e) => e._id === listTranDept._id);
        const index = list.indexOf(send);
        console.log('test', send);
        send.status = 'PAYED';
        this.setState({
            remList: [
                ...list.slice(0, index),
                send,
                ...list.slice(index + 1, list.length),
            ],
            issuccessModal: false,
            isShow: false,
            otp: ''
        });



    }


    render() {
        const { listDept, errMessage, pendding, errMess,
            transactionUser, penTran, pendding2
            , erMessage, showNextModal, listReminder } = this.props;
        console.log('1', listReminder)
        const { content, account,
            money, isFistLoad, txtName, confirmLoading,
            isLoadUpdate, isShow, otp, isfistLoad, } = this.state;
        // const isDisable = money && account && content.trim();
        let { remList, receiverInfo } = this.state;
        receiverInfo = receiverInfo.length > 0 ? receiverInfo : [...listDept];
        remList = remList.length > 0 ? remList : [...listReminder];
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
                    <Tabs type="card">

                        <TabPane tab="List other remind" key="1">
                            <div>
                                <Table dataSource={remList}
                                    pagination={{ pageSize: 10 }}
                                >

                                    <Column title="Acount reminder dept" dataIndex="bankAccountSender" key="bankAccountSender" />
                                    <Column title="Amount money" dataIndex="amount" key="amount" />
                                    <Column title="Status" dataIndex="_id" key="status"
                                        render={(_id) => (
                                            remList.map(item =>
                                                item._id === _id ?
                                                    <Button key={item._id} style={{ background: 'rgb(244, 208, 63)', color: 'white', fontWeight: 'bold', width: '70px' }}
                                                        onClick={() => this.transferStatus(item)} >{item.status}</Button>
                                                    : ""
                                            ))}
                                    />
                                    <Column
                                        title="Action"
                                        key="action"
                                        dataIndex="_id"
                                        render={(_id) => (

                                            <div>
                                                <EditTwoTone onClick={() => this.isShowEdit(_id)} />
                                                <DeleteTwoTone onClick={() => this.isShowDelete(_id, 'REMINDER')} className="ml-4" />
                                            </div>
                                        )}
                                    />
                                </Table>
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
                                                <EditTwoTone />
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
                    title="Add Dept"
                    visible={this.state.visible}

                    // okButtonProps={{ disabled:  }}
                    // confirmLoading={pendding}
                    onCancel={this.handleCancel}

                    footer={
                        [
                            <div>
                                {isLoadUpdate ?
                                    <Button key="submit" type="primary" >
                                        update
                             </Button> :
                                    <Button key="submit" type="primary" onClick={this.handleOk} loading={pendding}>
                                        Save
                             </Button>
                                }
                                <Button key="back" onClick={this.handleCancel}>
                                    Return
                            </Button>,
                           </div>
                        ]}

                >
                    <Form name="control-ref" className="myForm">
                        {errMessage && !isFistLoad && (
                            <Alert message={errMessage} type="error" />

                        )}

                        <Form.Item label="Account: " className="mt-5">
                            <Input type='number' name="account" value={account} onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item label=" Money : " >
                            <Input type='number' name="money" value={money} onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item label="Content: " >
                            <Input name="content" value={content} onChange={this.onChange} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title='Are you sure delete this task?'
                    visible={this.state.isDelete}
                    okText="yes"
                    okType='danger'
                    cancelText='No'
                    onOk={this.showDeleteConfirm}
                    confirmLoading={confirmLoading}

                    onCancel={this.isCancel}
                >
                    <p>content</p>
                    <Input value={txtName} onChange={this.onChangeName}></Input>

                </Modal>
                {showNextModal && <Modal
                    title="Transfer Dept"
                    visible={this.state.isTransfer}

                    style={{ top: '10px' }}
                    onCancel={this.handleCancelTransfer}


                    footer={[
                        <div>
                            <Button onClick={this.handleCancelTransfer}>cancel</Button>
                            <Button onClick={this.showModal}>Back</Button>
                        </div>
                    ]}
                >


                    <Form>
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
                            <div className='col'>    {transactionUser.content}</div>
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
                {
                    this.props.successModal && !this.issuccessModal &&
                    message.success('This is a success message')
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

export default connect(mapStateToProps, mapDispatchToProps)(DeptReminder);

