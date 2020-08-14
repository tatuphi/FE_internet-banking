import React, { Component } from "react";
import { Select, Table, DatePicker, Spin, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { employeeActions } from "action/employee.action";
import { SmileOutlined } from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;
const { Search } = Input;
var formatMoney = new Intl.NumberFormat();

class CustomerTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userInfo: "",
      accountName: "",
      isfirstLoad: false,
    };
  }

  onSearchValue = (value) => {
    const { getCustomerUserId, customerTransaction } = this.props;

    this.setState({ userInfo: value });
    getCustomerUserId(value, (res) => {
      customerTransaction({
        userId: res.userId,
      });
      this.setState({
        userId: res.userId,
        accountName: res.accountName,
        isfirstLoad: true,
      });
    });

    //
  };

  onChangeDates = (dates) => {
    const { customerTransaction } = this.props;
    const { userId, typeTransaction } = this.state;
    const dataSent = {
      startDate: dates ? moment(dates[0]._d).format("YYYY/MM/DD") : "",
      endDate: dates ? moment(dates[1]._d).format("YYYY/MM/DD") : "",
      userId,
      typeTransaction,
    };

    this.setState({
      startDate: dates ? moment(dates[0]._d).format("YYYY/MM/DD") : "",
      endDate: dates ? moment(dates[1]._d).format("YYYY/MM/DD") : "",
    });

    console.log(dataSent);
    customerTransaction(dataSent);
  };

  onchangeValue = (value) => {
    const { customerTransaction } = this.props;
    const { userId, startDate, endDate } = this.state;
    const dataSent = {
      typeTransaction: value,
      userId,
      startDate,
      endDate,
    };
    this.setState({ typeTransaction: value });
    console.log(dataSent);
    customerTransaction(dataSent);
  };

  render() {
    const { listCustomerTransaction, pendding, userResult, total } = this.props;
    const { isfirstLoad } = this.state;
    console.log(total);
    return (
      <div className="history">
        <div className="formName">
          HISTORY PAYMENT
          <span
            style={{ float: "right", color: "yellow" }}
            icon={<SmileOutlined />}
          >
            {userResult.accountName}
          </span>
        </div>
        {total && isfirstLoad && (
          <div style={{ color: "green", marginRight: "1px" }}>
            TOTAL: {formatMoney.format(total.total)} VND
          </div>
        )}
        <div className="itemPayment">
          <Search
            placeholder="Search username or account number of customer..."
            onSearch={this.onSearchValue}
            enterButton
          />
        </div>
        <div className="row mt-6 itemSmall">
          <div className="col col-6 ">
            {" "}
            <RangePicker
              onChange={this.onChangeDates}
              style={{ width: "100%", height: "100%", fontSize: "10px" }}
            />
          </div>
          <div className="col col-6">
            <Select
              style={{ width: "100%", height: "100%" }}
              onChange={this.onchangeValue}
              defaultValue="ALL TRANSACTION"
            >
              <Option value="GETMONEY">GET MONEY</Option>
              <Option value="TRANSFER">TRANSFER MONEY</Option>
              <Option value="INDEPT">PAY DEBT</Option>
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-4">
            {pendding && (
              <Spin
                size="large"
                style={{
                  position: "absolute",
                  zIndex: "3000",
                  margin: "20%",
                }}
              ></Spin>
            )}
          </div>
          <div>
            <Table
              dataSource={listCustomerTransaction}
              pagination={{ pageSize: 10 }}
            >
              <Column
                title="Receiver"
                dataIndex="bankAccountReceiver"
                key="bankAccountReceiver"
              />
              <Column
                title="Amount money"
                dataIndex="amount"
                key="amount"
                render={(amount) => (
                  <div>
                    <p>{`${formatMoney.format(amount)} VND`}</p>
                  </div>
                )}
              />
              <Column
                title="Type Send"
                dataIndex="typeSend"
                key="typeSend"
                render={(typeSend) => (typeSend ? "Payer" : "Payee")}
              />
              <Column
                title="Type Transaction"
                dataIndex="typeTransaction"
                key="typeTransaction"
              />
              <Column
                title="Fee"
                dataIndex="fee"
                key="fee"
                render={(fee) => (
                  <div>
                    <p>{`${formatMoney.format(fee)} VND`}</p>
                  </div>
                )}
              />
              <Column
                title="Date"
                dataIndex="createAt"
                key="createAt"
                render={(createAt) => (
                  <div>
                    <p>{moment(createAt).format("DD/MM/YYYY ")}</p>
                  </div>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.employee.pendding,
    userResult: state.employee.userResult,
    listCustomerTransaction: state.employee.listCustomerTransaction,
    errMessage: state.employee.errMessage,
    total: state.employee.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomerUserId: (userInfo, cb) =>
    dispatch(employeeActions.getCustomerUserId(userInfo, cb)),

  customerTransaction: (sentData) =>
    dispatch(employeeActions.customerTransaction(sentData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerTransaction);
