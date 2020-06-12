import API from "config/axios.config";
import { userConstant } from "constants/index";
import history from "config/history.config";

import authHeader from '../utils/auth-header';

const login = (username, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post("/auth/login", { username, password })
      .then((res) => {

        console.log(res.data.accessToken);
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('x-refresh-token', res.data.refreshToken);
        localStorage.setItem('user', res.data.name);
        localStorage.setItem('role', res.data.role);
        dispatch(success(res.data));

        history.push("/");
      })
      .catch((err) => dispatch(failure(err)));
  };

  function request() {
    return {
      type: userConstant.LOGIN,
    };
  }
  function success(user) {
    return {
      type: userConstant.LOGIN_SUCCESS,
      user,
    };
  }

  function failure(err) {
    return {
      type: userConstant.LOGIN_FAIL,
      err,
    };
  }
};
const getUserCurrent = () => {

  return (dispatch) => {
    dispatch(request());


    API.get("/auth//user", { headers: authHeader() })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));


      })
      .catch((err) => dispatch(failure(err)));
  };

  function request() {
    return {
      type: userConstant.GET_CURRENT_USER_REQUEST,
    };
  }
  function success(payload) {
    return {
      type: userConstant.GET_CURRENT_USER_SUCCESS,
      payload,
    };
  }

  function failure(err) {
    return {
      type: userConstant.GET_CURRENT_USER_FAILURE,
      err,
    };
  }
}
const getAccountNumber = (typeAccount) => {
  return (dispatch) => {


    let headers = authHeader();
    dispatch(request());


    API.get(`/auth/accountNumber`, { params: { typeAccount }, headers }
    )
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));

      })
      .catch((err) => dispatch(failure(err)));
  };

  function request() {
    return {
      type: userConstant.GET_ACCOUNT_NUMBER_REQUEST,
    };
  }
  function success(accountNumber) {
    return {
      type: userConstant.GET_ACCOUNT_NUMBER_SUCCESS,
      accountNumber,
    };
  }

  function failure(err) {
    return {
      type: userConstant.GET_ACCOUNT_NUMBER_FAILURE,
      err,
    };
  }
}


export const userActions = {
  login,
  getUserCurrent,
  getAccountNumber

};
