import { userConstant } from "constants/index";

const initialState = {
  token: localStorage.getItem("token"),
  isLogined: false,
  pendding: false,
  errMessage: "",
  sendOTP: false,
  userInfo: null,
  accountNumber: [],
  beneficiaries: [],
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
        isLogined: true,
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
        isLogined: true,
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

    default:
      return state;
  }
};

export default user;
