import React, { Component } from "react";
import { Select, Table, DatePicker, Spin } from "antd";
import { connect } from "react-redux";

import moment from "moment";

import { historyActions } from "action/history.action";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;
var formatMoney = new Intl.NumberFormat();

class HistoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const { transactionHistory } = this.props;

    transactionHistory();
  };
  onChangeDates = (dates) => {
    const { transactionHistory } = this.props;
    let dataSent = {};
    dataSent.startDate = moment(dates[0]._d).format("YYYY/MM/DD");
    dataSent.endDate = moment(dates[1]._d).format("YYYY/MM/DD");
    console.log("da", dataSent);
    transactionHistory(dataSent);
  };
  onchangeValue = (value) => {
    const { transactionHistory } = this.props;
    let dataSent = {};
    dataSent.typeTransaction = value;
    transactionHistory(dataSent);
  };

  render() {
    const { listHistory, pendingHistory, total } = this.props;
    return (
      <div className="history outletMain">
        <div className="formName">HISTORY PAYMENT</div>

        <div className="row mt-5  ">
          <div className="col">
            {" "}
            <RangePicker
              onChange={this.onChangeDates}
              style={{ height: "35px", fontSize: "20px" }}
            />
          </div>
          <div className="col">
            <Select
              style={{ width: "100%", height: "100%" }}
              onChange={this.onchangeValue}
              defaultValue="ALL TRANSACTION"
            >
              <Option value="GETMONEY">GET MONEY</Option>
              <Option value="TRANSFER">TRANSFER MONEY</Option>
              <Option value="INDEPT">PAY INDEPT</Option>
            </Select>
          </div>
        </div>
        <div className="mt-5">
          <div className="mt-4">
            {pendingHistory && (
              <Spin
                size="large"
                style={{
                  position: "absolute",
                  zIndex: "3000",
                  margin: "20%",
                }}
              >
                {/* {' '} */}
              </Spin>
            )}
          </div>
          <div>
            {total && (
              <div style={{ color: "green", marginRight: "1px" }}>
                TOTAL: {formatMoney.format(total.total)} VND
              </div>
            )}

            <Table
              dataSource={listHistory}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 500, x: 500 }}
            >
              <Column
                title="Receiver"
                dataIndex="bankAccountReceiver"
                key="bankAccountReceiver"
              />
              <Column
                title="Sender"
                dataIndex="bankAccountSender"
                key="bankAccountReceiver"
              />
              <Column title="Bank" dataIndex="nameBank" key="nameBank" />
              <Column
                title="Money"
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
                render={(typeSend) => <div>{typeSend ? "Payer" : "Payee"}</div>}
              />
              <Column
                title="Type"
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
    pendingHistory: state.history.pendingHistory,
    listHistory: state.history.listHistory,
    errHistory: state.history.errHistory,
    total: state.history.total,
  };
};

const mapDispatchToProps = (dispatch) => ({
  transactionHistory: (sentData) =>
    dispatch(historyActions.transactionHistory(sentData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryForm);
