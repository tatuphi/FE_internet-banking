import React, { Component } from "react";
import { Select, Collapse, Row, Col } from 'antd';
import { connect } from "react-redux";
import { userActions } from "action/user.action";

import VerticalMenu from "containers/Share/VerticalMenu";
const { Option } = Select;
const { Panel } = Collapse;

class informationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeAccount: '',
            accountNumber: [],
        };
    }
    componentDidMount = () => {
        const { getUserCurrent, getAccountNumber } = this.props;


        getUserCurrent();
        getAccountNumber();
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


            <div className="commom">

                <div
                    className="container background"

                >
                    <Row>
                        <Col span={6}>
                            <VerticalMenu />
                        </Col>
                        <Col span={18}>
                            <div className="outletMain">
                                <div className=" formName">INFORMATION ACCOUNT</div>
                                <hr></hr>
                                <Collapse accordion className='mt-4' >

                                    {accountNumber.map(item =>

                                        <Panel header={`Information Account ${item.typeAccount}`} key={item._key}>
                                            <div>
                                                <div className="d-flex mt-1">
                                                    <p>Account Number :</p>
                                                    <p>{item.accountNumber}</p>
                                                </div>
                                                <div className="d-flex mt-1">
                                                    <p>Balance Current:</p>
                                                    <p>{item.currentBalance} VND</p>

                                                </div>
                                                <div className="d-flex mt-1">
                                                    <p>Type Account:</p>
                                                    <p>{item.typeAccount} </p>

                                                </div>
                                            </div>
                                        </Panel>

                                    )}





                                </Collapse>,
                            <div >
                                </div>
                            </div>


                        </Col>
                    </Row>
                </div>




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
    getAccountNumber: () => dispatch(userActions.getAccountNumber()),
    getUserCurrent: () => dispatch(userActions.getUserCurrent())

});

export default connect(mapStateToProps, mapDispatchToProps)(informationUser);


