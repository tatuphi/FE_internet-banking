import React, { Component } from "react";
import { List, Spin } from "antd";

// import reqwest from 'reqwest';

import InfiniteScroll from "react-infinite-scroller";

import { connect } from "react-redux";
import { deptActions } from "action/dept.action";
import history from "config/history.config";

const timeStyle = {
  fontSize: "10px",
};

let page = 2;
var formatMoney = new Intl.NumberFormat();

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.notifications,
      loading: true,
      // hasMore: true,
    };
  }

  componentDidMount = () => {
    const { getListNotification } = this.props;
    getListNotification();
  };

  loadMoreNotification = () => {
    if (this.props.isLoadedMore) {
      this.setState({
        loading: true,
      });
      this.props.getListNotification(page);
      page += 1;
    }
  };

  handleLoadLatest = () => {
    this.setState({
      loading: true,
    });
    page = 1;
    this.props.getListNotification(page);
    this.setState({
      loading: false,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.notifications.length !== prevState.data.length) {
      this.setState({
        data: [...this.props.notifications],
        loading: false,
      });
    }
  };

  getNameSender = (title, username) => {
    const start = title.indexOf("{");
    const end = title.indexOf("}");
    return title.replace(title.slice(start, end + 1), username);
  };

  handleDeleleNotification = (notificationId) => {
    if (this.state.data.length === 5) {
      this.loadMoreNotification();
    }
    const { data } = this.state;
    const { setDeleteNotification } = this.props;
    const index = data.findIndex((item) => item._id === notificationId);
    if (index !== -1) {
      const newNoties = [
        ...data.slice(0, index),
        ...data.slice(index + 1, data.length),
      ];
      this.setState({ data: newNoties });
      setDeleteNotification(notificationId);
    }
  };

  handleMarkAsRead = (notificationId) => {
    const { data } = this.state;
    const { setReadNotification } = this.props;
    const index = data.findIndex((item) => item._id === notificationId);
    if (index !== -1) {
      const newNoties = [
        ...data.slice(0, index),
        {
          ...data[index],
          isRead: true,
        },
        ...data.slice(index + 1, data.length),
      ];
      this.setState({
        data: newNoties,
      });
      setReadNotification(notificationId);
    }
  };
  ontransaction = (id) => {
    history.push("/deptRemind");
  };

  renderNotification = (item) => {
    return (
      <List.Item key={item._id} type="button">
        <div onClick={this.ontransaction}>
          <div className="d-flex">
            {item.isRead ? (
              <div>
                <b>{item.type}</b>
                <div className="row">
                  <div className="col">
                    <p>{item.users_sender.accountName}</p>
                  </div>
                  <p>{formatMoney.format(item.amount)} VND</p>
                </div>
              </div>
            ) : (
              <h6 onClick={() => this.handleMarkAsRead(item._id)}>
                <b>{item.type}</b>
                <div className="row">
                  <div className="col">
                    <p>{item.users_sender.accountName}</p>
                  </div>
                  <p>{formatMoney.format(item.amount)} VND</p>
                </div>
              </h6>
            )}
          </div>
          <div>
            <div onClick={() => this.handleMarkAsRead(item._id)}>
              <p>{item.contentNotification}</p>
              <p style={timeStyle}>
                {new Date(item.createAt).toLocaleString()}
              </p>{" "}
            </div>
          </div>
        </div>
      </List.Item>
    );
  };

  render() {
    const { data, loading } = this.state;
    console.log("data", data);
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMoreNotification}
          hasMore={!loading}
          useWindow={false}
        >
          {/* <a className="float-right" onClick={() => this.handleLoadLatest}><i className="fa fa-arrow-up" aria-hidden="true"></i></a> */}
          <p
            type="button"
            className="fa-fw w3-margin-right w3-text-teal"
            style={{ width: "100px" }}
            onClick={() => this.handleLoadLatest()}
          >
            Load more <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </p>
          {loading && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
          <List
            dataSource={data}
            renderItem={(item) => this.renderNotification(item)}
          >
            {/* {loading && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )} */}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.dept.listNotification,
  isLoadedMore: state.dept.isLoadedMore,
});

const mapDispatchToProps = (dispatch) => ({
  getListNotification: (pageNumber, numberRecord) =>
    dispatch(deptActions.getListNotification(pageNumber, numberRecord)),
  setReadNotification: (id) => dispatch(deptActions.setReadNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
