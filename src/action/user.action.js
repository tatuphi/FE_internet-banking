import API from "config/axios.config";
import { userConstant } from "constants/index";
import history from "config/history.config";

const login = (email, password) => {
  return (dispatch) => {
    dispatch(request());
    API.post("/login", { email, password })
      .then((res) => {
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

export const userActions = {
  login,
};
