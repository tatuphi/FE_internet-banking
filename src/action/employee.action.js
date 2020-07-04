import API from "config/axios.config";
import { employeeConstants } from "constants/index";
import history from "config/history.config";
import authHeader from "../utils/auth-header";

const registerAccount = (fullName, email, phone) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure("Invalid email !"));
    } else {
      let headers = authHeader();
      // console.log("test", headers);

      dispatch(request());

      API.post(
        "/employee/register",
        { fullName, email, phone },
        { headers: headers }
      )
        .then((res) => {
          dispatch(success(res.data.result));
        })
        .catch((error) => {
          return dispatch(failure(error.response.data.message) || "OOPs! something wrong");
        });
    }
  };
  function request() {
    return { type: employeeConstants.REGISTERBANKACCOUN_REQUEST };
  }
  function success(customer) {
    return { type: employeeConstants.REGISTERBANKACCOUN_SUCCESS, customer };
  }
  function failure(error) {
    return { type: employeeConstants.REGISTERBANKACCOUN_FAILURE, error };
  }
};

const applyMoney = (accountNumber, amountMoney) => {
  return (dispatch) => {
    if (amountMoney < 0) {
      return dispatch(failure("Invalid amount"));
    } else {
      let headers = authHeader();

      dispatch(request());

      API.post(
        "/employee/applyMoney",
        { accountNumber, amountMoney },
        { headers: headers }
      )
        .then((res) => {
          dispatch(success(res.data.result));
        })
        .catch((error) => {
          return dispatch(failure(error.response.data.message) || "OOPs! something wrong");
        });
    }
  };
  function request() {
    return { type: employeeConstants.APPLYMONEY_REQUEST };
  }
  function success(money) {
    return { type: employeeConstants.APPLYMONEY_SUCCESS, money };
  }
  function failure(error) {
    console.log(error)
    return { type: employeeConstants.APPLYMONEY_FAILURE, error };
  }
};
const customerTransaction = (sentData) => {
  return (dispatch) => {
    dispatch(request());

    API.get("/employee/history", {
      params: sentData,
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
      type: employeeConstants.GET_CUSTOMER_REQUEST,
    };
  }
  function success(listCustomerTransaction) {
    return {
      type: employeeConstants.GET_CUSTOMER_SUCCESS,
      listCustomerTransaction,
    };
  }

  function failure(error) {
    return {
      type: employeeConstants.GET_CUSTOMER_FAILURE,
      error,
    };
  }
};
const getCustomerUserId = (userInfo, cb) => {
  return (dispatch) => {
    dispatch(request());

    API.get("/employee/getCustomerUserId", {
      params: { userInfo },
      headers: authHeader(),
    })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));
        cb(res.data.result);
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
      type: employeeConstants.GET_CUSTOMER_USERID_REQUEST,
    };
  }
  function success(userResult) {
    return {
      type: employeeConstants.GET_CUSTOMER_USERID_SUCCESS,
      userResult,
    };
  }

  function failure(error) {
    return {
      type: employeeConstants.GET_CUSTOMER_USERID_FAILURE,
      error,
    };
  }
};
const getCustomer = () => {
  return (dispatch) => {
    dispatch(request());

    API.get("/employee/customer", {
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
      type: employeeConstants.GET_CUSTOMER_LIST_REQUEST,
    };
  }
  function success(listCustomer) {
    return {
      type: employeeConstants.GET_CUSTOMER_LIST_SUCCESS,
      listCustomer,
    };
  }

  function failure(error) {
    return {
      type: employeeConstants.GET_CUSTOMER_LIST_FAILURE,
      error,
    };
  }
};
export const employeeActions = {
  registerAccount,
  applyMoney,
  customerTransaction,
  getCustomerUserId,
  getCustomer
};
