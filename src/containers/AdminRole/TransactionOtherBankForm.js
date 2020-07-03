import React, { Component } from "react";
import { Select, Table, DatePicker, Spin } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { adminActions } from "action/admin.action";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;

class TransactionOtherBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const { showhistoryLinkBank } = this.props;
    showhistoryLinkBank();
  };
  onChangeDates = (dates) => {
    const { showhistoryLinkBank } = this.props;
    const { nameBank } = this.state;
    const dataSent = {
      startDate: dates ? moment(dates[0]._d).format("YYYY/MM/DD") : "",
      endDate: dates ? moment(dates[1]._d).format("YYYY/MM/DD") : "",
      nameBank,
    };

    this.setState({
      startDate: dates ? moment(dates[0]._d).format("YYYY/MM/DD") : "",
      endDate: dates ? moment(dates[1]._d).format("YYYY/MM/DD") : "",
      nameBank,
    });

    showhistoryLinkBank(dataSent);
  };

  onchangeValue = (value) => {
    const { showhistoryLinkBank } = this.props;
    const { startDate, endDate } = this.state;
    const dataSent = {
      nameBank: value,
      startDate,
      endDate,
    };
    this.setState({ nameBank: value });
    showhistoryLinkBank(dataSent);
  };

  render() {
    const { listHistoryLinkBank, total, pendding } = this.props;

    return (
      <div className="history">
        <div className="formName">HISTORY TRANSACTION WITH OTHER BANK</div>
        <div style={{ color: "green" }}>TOTAL: {total.total}</div>
        <div className="row mt-6 itemSmall">
          <div className="col col-6 ">
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
              <Option value="S2QBank">S2QBank</Option>
              <Option value="MPBank">MPBank</Option>
              <Option value="NKLBank">NKLBank</Option>
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
              dataSource={listHistoryLinkBank}
              pagination={{ pageSize: 10 }}
            >
              <Column
                title="Sender"
                dataIndex="bankAccountSender"
                key="bankAccountSender"
                render={(bankAccountSender) => (
                  <div>
                    <p>{`${bankAccountSender}`}</p>
                  </div>
                )}
              />
              <Column
                title="Receiver"
                dataIndex="bankAccountReceiver"
                key="bankAccountReceiver"
                render={(bankAccountReceiver) => (
                  <div>
                    <p>{`${bankAccountReceiver}`}</p>
                  </div>
                )}
              />
              <Column
                title="Amount money"
                dataIndex="amount"
                key="amount"
                render={(amount) => (
                  <div>
                    <p>{`${amount} VND`}</p>
                  </div>
                )}
              />
              <Column
                title="Fee"
                dataIndex="fee"
                key="fee"
                render={(fee) => (
                  <div>
                    <p>{`${fee} VND`}</p>
                  </div>
                )}
              />
              <Column
                title="Content"
                dataIndex="content"
                key="content"
                render={(content) => (
                  <div>
                    <p>{`${content}`}</p>
                  </div>
                )}
              />
              <Column
                title="Type Transaction"
                dataIndex="typeTransaction"
                key="typeTransaction"
                render={(typeTransaction) => (
                  <div>
                    <p>{`${typeTransaction}`}</p>
                  </div>
                )}
              />
              <Column
                title="Bank"
                dataIndex="nameBank"
                key="nameBank"
                render={(nameBank) => (
                  <div>
                    <p>{`${nameBank}`}</p>
                  </div>
                )}
              />

              <Column
                title="Date"
                dataIndex="timeOTP"
                key="timeOTP"
                render={(timeOTP) => (
                  <div>
                    <p>{moment(timeOTP).format("DD/MM/YYYY ")}</p>
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
    pendding: state.admin.pendding,
    listHistoryLinkBank: state.admin.listHistoryLinkBank,
    total: state.admin.total,
    errMessage: state.admin.errMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showhistoryLinkBank: (sentData) =>
    dispatch(adminActions.showhistoryLinkBank(sentData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionOtherBankForm);
