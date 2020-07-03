import API from "config/axios.config";
import { adminConstants } from "constants/index";
import authHeader from "../utils/auth-header";

const getAllEmployee = () => {
  return (dispatch) => {
    dispatch(request());

    API.get("/admin/employee", { headers: authHeader() })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((err) => dispatch(failure(err)));
  };
  function request() {
    return {
      type: adminConstants.GET_ALL_EMPLOYEE_REQUEST,
    };
  }
  function success(listEmployee) {
    return {
      type: adminConstants.GET_ALL_EMPLOYEE_SUCCESS,
      listEmployee,
    };
  }

  function failure(error) {
    return {
      type: adminConstants.GET_ALL_EMPLOYEE_FAILURE,
      error,
    };
  }
};
const getEmployee = (id) => {
  return (dispatch) => {
    dispatch(request());

    API.get("/admin/getEmployee", {
      params: { id },
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.error) {
          return dispatch(
            failure(data.error.message) || "OOPs! something wrong"
          );
        }
        return dispatch(failure(error) || "OOPs! something wrong");
      });
  };
  function request() {
    return {
      type: adminConstants.GET_EMPLOYEE_REQUEST,
    };
  }
  function success(getEmployee) {
    return {
      type: adminConstants.GET_EMPLOYEE_SUCCESS,
      getEmployee,
    };
  }

  function failure(error) {
    return {
      type: adminConstants.GET_EMPLOYEE_FAILURE,
      error,
    };
  }
};
const createEmployee = (fullName, email) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure("Invalid email !"));
    } else {
      let headers = authHeader();

      dispatch(request());

      API.post(
        "/admin/create/employee",
        { fullName, email },
        { headers: headers }
      )
        .then((res) => {
          dispatch(success(res.data.data));
        })
        .catch((error) => {
          const { data } = error.response;
          if (data.error) {
            return dispatch(
              failure(data.error.message) || "OOPs! something wrong"
            );
          }
          return dispatch(failure(error) || "OOPs! something wrong");
        });
    }
  };
  function request() {
    return { type: adminConstants.CREATE_EMPLOYEE_REQUEST };
  }
  function success(createEmployee) {
    console.log("n", createEmployee);
    return { type: adminConstants.CREATE_EMPLOYEE_SUCCESS, createEmployee };
  }
  function failure(error) {
    return { type: adminConstants.CREATE_EMPLOYEE_FAILURE, error };
  }
};
const deleteEmployee = (employeeId) => {
  return (dispatch) => {
    let headers = authHeader();

    dispatch(request());

    API.post("/admin/deleteEmployee", { employeeId }, { headers: headers })
      .then((res) => {
        dispatch(success(employeeId));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.error) {
          return dispatch(
            failure(data.error.message) || "OOPs! something wrong"
          );
        }
        return dispatch(failure(error) || "OOPs! something wrong");
      });
  };
  function request() {
    return { type: adminConstants.DELETE_EMPLOYEE_REQUEST };
  }
  function success(employeeId) {
    return { type: adminConstants.DELETE_EMPLOYEE_SUCCESS, employeeId };
  }
  function failure(error) {
    return { type: adminConstants.DELETE_EMPLOYEE_FAILURE, error };
  }
};
const showhistoryLinkBank = (sentData) => {
  return (dispatch) => {
    dispatch(request());

    API.get("/admin/showhistoryLinkBank", {
      params: sentData,
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res.data.result);
        dispatch(
          success(res.data.result.transaction, res.data.result.total[0])
        );
      })
      .catch((err) => dispatch(failure(err)));
  };
  function request() {
    return {
      type: adminConstants.GET_TRANSACTION_OTHERBANK_REQUEST,
    };
  }
  function success(listHistoryLinkBank, total) {
    return {
      type: adminConstants.GET_TRANSACTION_OTHERBANK_SUCCESS,
      listHistoryLinkBank,
      total,
    };
  }

  function failure(error) {
    return {
      type: adminConstants.GET_TRANSACTION_OTHERBANK_FAILURE,
      error,
    };
  }
};
const updateEmployee = (sentData) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());

      API.post("/admin/updateEmployee", sentData, { headers: authHeader() })
        .then((res) => {
          console.log(res.data.result);
          dispatch(success(res.data.result, res.data.result._id));
          resolve(res.data.result);
        })
        .catch((error) => {
          const { data } = error.response;
          console.log("1", data.error.message);
          if (data.error) {
            return dispatch(
              failure(data.error.message) || "OOPs! something wrong"
            );
          }
          reject();
          return dispatch(failure(error) || "OOPs! something wrong");
        });
    });
  };

  function request() {
    return {
      type: adminConstants.UPDATE_EMPLOYEE_REQUEST,
    };
  }
  function success(updateEmployee, idEditEmployee) {
    return {
      type: adminConstants.UPDATE_EMPLOYEE_SUCCESS,
      updateEmployee,
      idEditEmployee,
    };
  }

  function failure(error) {
    return {
      type: adminConstants.UPDATE_EMPLOYEE_FAILURE,
      error,
    };
  }
};
export const adminActions = {
  getAllEmployee,
  getEmployee,
  createEmployee,
  deleteEmployee,
  showhistoryLinkBank,
  updateEmployee,
};
