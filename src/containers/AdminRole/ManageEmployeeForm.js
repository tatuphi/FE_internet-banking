import React, { Component } from "react";
import { Button, Table, Form, Input, Modal, Alert, Select } from "antd";
import { connect } from "react-redux";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { adminActions } from "action/admin.action";

const { Column } = Table;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
class ManageEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      username: "",
      role: "",
      isLoadUpdate: false,
      isFistLoad: true,
      visible: false,
      isDelete: false,
      showDeErr: true,
      showDeSuccess: true,
      idEmployee: "",
      secondLoad: true
    };
  }
  componentDidMount = () => {
    const { getAllEmployee } = this.props;
    getAllEmployee();
  };
  showModalSave = () => {
    this.setState({ visible: true });
  };
  showModalCancelSave = () => {
    this.setState({ visible: false });
  };
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    console.log(newValue);
  }
  handleOk = () => {
    const { createEmployee } = this.props;
    const { fullName, email } = this.state;
    createEmployee(fullName, email);
    this.setState({ isFistLoad: false, secondLoad: false })
  };
  isShowDelete = (idEmployee) => {
    this.setState({
      idEmployee: idEmployee,
      isDelete: true,
    });
  };
  isCancel = () => {
    this.setState({
      isDelete: false,
      showDeErr: true,
      showDeSuccess: true,
    });
  };
  showDeleteConfirm = () => {
    const { deleteEmployee } = this.props;
    const { idEmployee } = this.state;
    deleteEmployee(idEmployee);
    this.setState({
      showDeErr: false,
      showDeSuccess: false,
    });
  };
  edit = (id) => {
    const { listEmployee } = this.props;
    let employee = listEmployee.find((e) => e._id === id);
    this.setState({
      fullName: employee.fullName,
      email: employee.email,
      username: employee.username,
      role: employee.role,
      idEmployee: employee._id,
      visible: true,
      isLoadUpdate: true,
    });
  };
  handleUpdate = () => {
    const { updateEmployee } = this.props;

    const { fullName, email, role, username, idEmployee } = this.state;
    const editData = {
      fullName: fullName,
      email: email,
      role: role,
      username: username,
      id: idEmployee,
    };
    updateEmployee(editData);
  };
  onchangeValue = (value) => {
    this.setState({ role: value });
  };

  render() {
    const {
      isFistLoad,
      fullName,
      email,
      username,
      role,
      isLoadUpdate,
      showDeErr,
      showDeSuccess,
      secondLoad,

    } = this.state;

    const {
      listEmployee,
      errDelete,
      successDelete,
      pendding,
      errMessage,
      issucess,
    } = this.props;
    console.log(("listEmployee", listEmployee));
    return (
      <div className="history">

        <div className="formName"> LIST EMPLOYEE MANAGEMENT</div>
        <Button type="primary" shape="round" onClick={this.showModalSave} className="ml-2">
          <PlusOutlined /> Add Employee
        </Button>
        <div className="mt-4">
          {/* {pendding && (
            <Spin
              size="large"
              style={{
                position: "absolute",
                zIndex: "3000",
                margin: "20%",
              }}
            ></Spin>
          )} */}
        </div>
        <div className="mt-3">
          <Table dataSource={listEmployee} pagination={{ pageSize: 10 }}>
            <Column
              title="Username"
              dataIndex="username"
              key="username"
              render={(username) => (
                <div>
                  <p>{`${username}`}</p>
                </div>
              )}
            />
            <Column
              title="Full Name "
              dataIndex="fullName"
              key="fullName"
              render={(fullName) => (
                <div>
                  <p>{`${fullName}`}</p>
                </div>
              )}
            />
            <Column
              title="Email"
              dataIndex="email"
              key="email"
              render={(email) => (
                <div>
                  <p>{`${email}`}</p>
                </div>
              )}
            />
            <Column
              title="Action"
              key="action"
              dataIndex="_id"
              render={(_id) => (
                <div>
                  <EditTwoTone onClick={() => this.edit(_id)} />
                  <DeleteTwoTone
                    onClick={() => this.isShowDelete(_id)}
                    className="ml-4"
                  />
                </div>
              )}
            />
          </Table>
          <Modal
            visible={this.state.visible}
            title="Add new employee"
            onCancel={this.showModalCancelSave}
            footer={[]}
          >
            <div>
              <Form className="myForm" {...layout} form={this.form}>
                {errMessage && !isFistLoad && (
                  <Alert message={errMessage} type="error" />
                )}
                {issucess && !secondLoad && (
                  <Alert message="create success" type="error" />
                )}

                <Form.Item label="Full name" className="mt-5">
                  <Input
                    name="fullName"
                    value={fullName}
                    onChange={(e) =>
                      this.onChangeValue(e.target.value, "fullName")
                    }
                  />
                </Form.Item>

                <Form.Item label="Email">
                  <Input
                    name="email"
                    value={email}
                    onChange={(e) =>
                      this.onChangeValue(e.target.value, "email")
                    }
                  />
                </Form.Item>

                {isLoadUpdate ? (
                  <div>
                    <Form.Item label="Username">
                      <Input
                        name="username"
                        value={username}
                        onChange={(e) =>
                          this.onChangeValue(e.target.value, "username")
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Role">
                      <Select
                        onChange={this.onchangeValue}
                        defaultValue="EMPLOYEE"
                      >
                        <Option value="EMPLOYEE">EMPLOYEE</Option>
                        <Option value="ADMIN">ADMIN</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                      <Button
                        key="submit"
                        type="primary"
                        onClick={this.handleUpdate}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </div>
                ) : (
                    <Form.Item label=" " colon={false}>
                      <Button key="submit" type="primary" onClick={this.handleOk} loading={pendding}>
                        Save
                    </Button>
                    </Form.Item>
                  )}
              </Form>
            </div>
          </Modal>
          <Modal
            visible={this.state.isDelete}
            onCancel={this.isCancel}
            title="Confirm to delete"
            footer={[]}
          >
            <div>
              <Form className="myForm" {...layout} form={this.form}>
                {errDelete && !showDeErr && (
                  <h5 style={{ color: "red" }}>{errDelete}</h5>
                )}
                {successDelete && !showDeSuccess && (
                  <h5 style={{ color: "green" }}>Delete success</h5>
                )}
                <Form.Item style={{ marginLeft: "25%" }}>
                  Are you sure to detele this employee?
                </Form.Item>
                <div style={{ marginLeft: "35%" }}>
                  <Button
                    type="ghost"
                    loading={pendding}
                    onClick={this.showDeleteConfirm}
                  >
                    Yes
                  </Button>
                  <Button
                    className="ml-3"
                    type="default"
                    onClick={this.isCancel}
                  >
                    No
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pendding: state.admin.pendding,
    listEmployee: state.admin.listEmployee,
    infoEmployee: state.admin.infoEmployee,
    errMessage: state.admin.errMessage,
    pend: state.admin.pend,
    errsave: state.admin.errsave,
    pendDelete: state.admin.pendDelete,
    errDelete: state.admin.errDelete,
    successDelete: state.admin.successDelete,
    issucess: state.admin.issucess
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllEmployee: () => dispatch(adminActions.getAllEmployee()),
  createEmployee: (fullName, email) =>
    dispatch(adminActions.createEmployee(fullName, email)),
  deleteEmployee: (idEmployee) =>
    dispatch(adminActions.deleteEmployee(idEmployee)),
  updateEmployee: (dataEdit) => dispatch(adminActions.updateEmployee(dataEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployeeForm);
