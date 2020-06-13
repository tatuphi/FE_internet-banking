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
    return { type: employeeConstants.REGISTERBANKACCOUN_REQUEST };
  }
  function success() {
    return { type: employeeConstants.REGISTERBANKACCOUN_SUCCESS };
  }
  function failure(error) {
    return { type: employeeConstants.REGISTERBANKACCOUN_FAILURE, error };
  }
};

export const employeeActions = {
  registerAccount,
};
