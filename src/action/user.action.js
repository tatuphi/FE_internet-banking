import API from "config/axios.config";
import { userConstant } from "constants/index";
import history from "config/history.config";
import setAuthorizationToken from "../utils/setAuthoriaztionJWt";
const login = (email, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post("/auth/login", { email, password })
      .then((res) => {
        console.log(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        const token = res.data.accessToken;
        setAuthorizationToken(token);
        localStorage.setItem("x-refresh-token", res.data.refreshToken);
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
    return { type: userConstant.FORGOTPASSWORD_REQUEST };
  }
  function success() {
    return { type: userConstant.FORGOTPASSWORD_SUCCESS };
  }
  function failure(error) {
    return { type: userConstant.FORGOTPASSWORD_FAILURE, error };
  }
};

export const userActions = {
  login,
  requestForgotPassword,
  forgotPassword,
};
