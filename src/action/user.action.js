import API from "config/axios.config";
import { userConstant } from "constants/index";
import history from "config/history.config";
import handleCatch from "utils/middleWare";

import authHeader from "../utils/auth-header";

const login = (username, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post("/auth/login", { username, password })
      .then((res) => {
        console.log(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("x-refresh-token", res.data.refreshToken);

        dispatch(success(res.data.userFind));

        history.push("/");
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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

  function failure(error) {
    return {
      type: userConstant.LOGIN_FAIL,
      error,
    };
  }
};
const getUserCurrent = () => {
  return (dispatch) => {
    dispatch(request());

    API.get("/auth/user", { headers: authHeader() })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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
};
const logout = () => {
  return (dispatch) => {
    dispatch(request());
    history.push("/login");
  };

  function request() {
    return { type: userConstant.LOGOUT };
  }
};
const getAccountNumber = (typeAccount) => {
  return (dispatch) => {
    let headers = authHeader();
    dispatch(request());

    API.get(`/auth/accountNumber`, { params: { typeAccount }, headers })
      .then((res) => {
        console.log("typeAccount : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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
};

const requestForgotPassword = (username, email) => {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return (dispatch) => {
    if (!regex.test(email)) {
      return dispatch(failure("Invalid email !"));
    } else {
      dispatch(request());

      API.post("/auth/requestForgotPassword", {
        username,
        email,
      })
        .then((res) => {
          dispatch(success());
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
        });
    }
  };
  function request() {
    return { type: userConstant.SENDEMAILFORGOTPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstant.SENDEMAILFORGOTPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstant.SENDEMAILFORGOTPASSWORD_FAILURE, error };
  }
};

const forgotPassword = (email, username, otp, newPassword) => {
  return (dispatch) => {
    if (otp.length !== 6) {
      return dispatch(failure("OTP has 6 numbers "));
    } else if (newPassword.length < 8) {
      return dispatch(failure("New password has at least 8 characters"));
    } else if (newPassword.indexOf(" ") !== -1) {
      return dispatch(failure("Password should not have white space "));
    } else {
      dispatch(request());

      API.post("/auth/forgotPassword", {
        username,
        email,
        otp,
        newPassword,
      })
        .then((res) => {
          dispatch(success());
          history.push("/login");
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
        });
    }
  };
  function request() {
    return { type: userConstant.FORGOTPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstant.FORGOTPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstant.FORGOTPASSWORD_FAILURE, error };
  }
};
const getBeneficiary = () => {
  return (dispatch) => {
    dispatch(request());

    API.get("/transfer/receiver", { headers: authHeader() })
      .then((res) => {
        console.log(res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return {
      type: userConstant.GET_BENEFICIARY_REQUEST,
    };
  }
  function success(beneficiaries) {
    return {
      type: userConstant.GET_BENEFICIARY_SUCCESS,
      beneficiaries,
    };
  }

  function failure(err) {
    return {
      type: userConstant.GET_BENEFICIARY_FAILURE,
      err,
    };
  }
};
const updatePassword = (oldPassword, newPassword) => {
  return (dispatch) => {
    if (newPassword.length < 8) {
      return dispatch(failure("New password has at least 8 characters"));
    } else if (newPassword.indexOf(" ") !== -1) {
      return dispatch(failure("Password must not have white space "));
    } else {
      let headers = authHeader();
      dispatch(request());

      API.post(
        "/auth/updatePassword",
        { oldPassword, newPassword },
        { headers: headers }
      )
        .then((res) => {
          dispatch(success());
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
        });
    }
  };
  function request() {
    return { type: userConstant.UPDATEPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstant.UPDATEPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstant.UPDATEPASSWORD_FAILURE, error };
  }
};
export const userActions = {
  login,
  requestForgotPassword,
  forgotPassword,
  getUserCurrent,
  getAccountNumber,
  logout,
  updatePassword,
  getBeneficiary,
};
