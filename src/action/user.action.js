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
        localStorage.setItem('token', res.data.accessToken);
        const token = res.data.accessToken;
        setAuthorizationToken(token);
        localStorage.setItem('x-refresh-token', res.data.refreshToken);
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
