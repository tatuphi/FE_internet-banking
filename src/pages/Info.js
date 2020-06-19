import React, { Component } from "react";
import { Select, Divider, Input, Row, Col } from 'antd';
import { connect } from "react-redux";
import { userActions } from "action/user.action";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";



import TransferMoneyForm from "containers/TransferMoneyForm";
import VerticalMenu from "containers/Share/VerticalMenu";
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
        const { accountNumber, pendding, userInfo } = this.props;
        console.log('tl', userInfo)
        console.log("mo:", accountNumber)
        return (


            <div style={{ backgroundColor: "#757272" }}>
                <Header />
                <div
                    className="container"
                    style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
                >
                    <Row>
                        <Col span={6}>
                            <VerticalMenu />
                        </Col>
                        <Col span={18}>

                            <div >
                                <div>
                                    <div className="d-flex mt-5">
                                        <h6>Account Number :</h6>
                                        <h5>{userInfo.accountNumber}</h5>


                                    </div>
                                    <div className="d-flex mt-5">
                                        <h6>Balance Current:</h6>
                                        <h5>{userInfo.currentBalance}</h5>

                                    </div>
                                </div>

                                <Select style={{ width: '50%' }} onChange={this.onChangeAccount} loading={pendding}>
                                    <Option value="Credit">Tài khoản thanh toán</Option>
                                    <Option value="Saving">Tài khoản tiết kiệm</Option>
                                </Select>
                                <div className="mt-5">
                                    <Select style={{ width: '50%' }}>

                                        {accountNumber.map((item, index) =>
                                            <Option value={item.accountNumber} >
                                                {item.accountNumber}
                                            </Option>
                                        )}

                                    </Select>
                                </div>



                            </div>


                        </Col>
                    </Row>
                </div>



                <Footer />
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        pendding: state.user.pendding,
        accountNumber: state.user.accountNumber,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAccountNumber: (typeAccount) => dispatch(userActions.getAccountNumber(typeAccount)),
    getUserCurrent: () => dispatch(userActions.getUserCurrent())

});

export default connect(mapStateToProps, mapDispatchToProps)(informationUser);


