import React, { Component } from "react";
import { Table } from "antd";
import { employeeActions } from "action/employee.action";
import { connect } from "react-redux";
const { Column } = Table

class ShowCustomers extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    componentDidMount = () => {
        const { getCustomer } = this.props;
        getCustomer();
    }
    render() {
        const { listCustomer } = this.props
        const src = "https://res.cloudinary.com/eventinyourhand/image/upload/v1592392503/LoadingGif/Animations_UI_et_web_design_30_cr%C3%A9ations_en_mouvement_um1i5t.gif?fbclid=IwAR3FTjpL8uQY-3qsk7UFErDGHRp9SKftD6jvWPk0v2ZLNHiIBNDCmt635eQ"
        return (
            <div >

                <Table dataSource={listCustomer}
                    pagination={10}
                    style={{ width: '100%' }}
                    scroll={{ y: 400, x: 500 }}
                >

                    <Column title="Full Name" dataIndex="accountName" key="accountName" />
                    <Column title="Account Number" dataIndex="accountNumber" key="accountNumber" />
                    <Column title="User Name" dataIndex="user" key="user"
                        render={(user) => (
                            <div>
                                {user.username}
                            </div>
                        )}
                    />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Current Balance" dataIndex="currentBalance" key="currentBalance" />
                    <Column title="Type Account" dataIndex="typeAccount" key="typeAccount" />
                    <Column title="Password Generate" dataIndex="hashPassword" key="email" />
                </Table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        pendCustomer: state.user.pendCustomer,
        errMessage: state.employee.errMessage,
        listCustomer: state.employee.listCustomer
    };
};

const mapDispatchToProps = (dispatch) => ({
    getCustomer: () =>
        dispatch(employeeActions.getCustomer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowCustomers);
