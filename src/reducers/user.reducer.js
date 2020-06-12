import { userConstant } from "constants/index";

const initialState = {
  isLogined: false,
  pendding: false,
  errMessage: "",
  sendOTP: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.LOGIN:
      return {
        ...state,
        pendding: true,
      };

    case userConstant.LOGIN_FAIL:
      return {
        ...state,
        pendding: false,
        isLogined: false,
      };

    case userConstant.LOGIN_SUCCESS:
      return {
        ...state,
        pendding: false,
        isLogined: true,
      };

    case userConstant.SENDEMAILFORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case userConstant.SENDEMAILFORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
        sendOTP: false,
      };

    case userConstant.SENDEMAILFORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        sendOTP: true,
      };
    case userConstant.FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case userConstant.FORGOTPASSWORD_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case userConstant.FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
      };

    default:
      return state;
  }
};

export default user;
