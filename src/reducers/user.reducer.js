import { userConstant } from "constants/index";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("isAuth"),
  pendding: false,
  errMessage: "",
  errOtp: "",
  sendOTP: false,
  updatedPassword: false,
  userInfo: [],
  accountNumber: [],
  beneficiaries: [],
  errFogot: ""
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
        isAuth: false,
        errMessage: action.error


      };

    case userConstant.LOGIN_SUCCESS:
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", action.user.fullName);
      localStorage.setItem("role", action.user.role);
      return {
        ...state,
        pendding: false,
        isAuth: true,
        userInfo: action.user,
        errMessage: null
      };
    case userConstant.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("x-refresh-token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      return {
        ...state,
        userInfo: null,
        isAuth: false,
        pending: false,
      };

    case userConstant.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstant.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        pending: false,
        isAuth: true,
      };
    case userConstant.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        userInfo: null,
        pending: false,
      };

    case userConstant.GET_ACCOUNT_NUMBER_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case userConstant.GET_ACCOUNT_NUMBER_SUCCESS:
      return {
        ...state,
        accountNumber: action.accountNumber,
        pending: false,
        isAuth: true,
      };
    case userConstant.GET_ACCOUNT_NUMBER_FAILURE:
      return {
        ...state,
        accountNumber: null,
        pending: false,
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
        errFogot: action.error,
        sendOTP: false,
      };

    case userConstant.SENDEMAILFORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pendding: false,
        errFogot: "",
        sendOTP: true,
      };
    case userConstant.FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        pendding: true,

      };
    case userConstant.FORGOTPASSWORD_FAILURE:
      console.log(action.error)
      return {
        ...state,
        pendding: false,
        errOtp: action.error,

      };
    case userConstant.FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        pendding: false,
        errOtp: "",

      };

    case userConstant.REGISTERBANKACCOUN_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case userConstant.REGISTERBANKACCOUN_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case userConstant.REGISTERBANKACCOUN_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
      };
    case userConstant.GET_BENEFICIARY_REQUEST:
      return {
        ...state,
        pendding: true,
        errMessage: null,
      };
    case userConstant.GET_BENEFICIARY_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case userConstant.GET_BENEFICIARY_SUCCESS:
      return {
        ...state,
        beneficiaries: action.beneficiaries,
        pendding: false,
        errMessage: null,
      };

    case userConstant.TRANSACTION_LOCAL_RECEIVE_REQUEST:
      return {
        ...state,
        pendding: true,
        errMessage: null,
      };
    case userConstant.TRANSACTION_LOCAL_RECEIVE_SUCCESS:
      return {
        ...state,
        pendding: false,
        receiver: action.receiver,
        errMessage: null,
      };
    case userConstant.TRANSACTION_LOCAL_RECEIVE_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case userConstant.UPDATEPASSWORD_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case userConstant.UPDATEPASSWORD_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
        updatedPassword: false,
      };
    case userConstant.UPDATEPASSWORD_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        updatedPassword: true,
      };

    default:
      return state;
  }
};

export default user;
