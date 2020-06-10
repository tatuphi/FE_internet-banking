import React, { Component } from "react";
import { Select, Divider, Input } from 'antd';
import { connect } from "react-redux";
import { userActions } from "action/user.action";
const { Option } = Select;
class informationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeAccount: '',
            accountNumber: [],
        };
    }
    componentDidMount = () => {
        const { getUserCurrent } = this.props;

        getUserCurrent();

    }
    onChangeAccount = (value) => {
        const { getAccountNumber, accountNumber } = this.props;
        this.setState({
            typeAccount: value,
            accountNumber
        })


        getAccountNumber(value);
    }

    render() {
        const { accountNumber, pendding } = this.props;
        console.log("mo:", accountNumber)
        return (
            <div style={{ padding: '20%' }}>
                <Select style={{ width: '50%' }} onChange={this.onChangeAccount} loading={pendding}>
                    <Option value="Credit">Tài khoản thanh toán</Option>
                    <Option value="Saving">Tài khoản tiết kiệm</Option>
                </Select>
                <div className="mt-5">
                    <Select style={{ width: '50%' }}>
                        <Select style={{ width: '100%' }} onChange={this.onChangeAccount}>
                            {accountNumber.map((item) => (
                                <Option key={item._id} value={item.accountNumber}>

                                </Option>
                            ))}
                        </Select>
                    </Select>
                </div>
                <div className="d-flex mt-5">
                    <p>Số dư hiện tại </p>
                    <p>100000 VNĐ</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pendding: state.user.pendding,
        accountNumber: state.user.accountNumber,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
    getUserCurrent: () => dispatch(userActions.getUserCurrent())

});

export default connect(mapStateToProps, mapDispatchToProps)(informationUser);


