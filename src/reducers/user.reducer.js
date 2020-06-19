import { userConstant } from "constants/index";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem('isAuth'),
  pendding: false,
  errMessage: "",
  sendOTP: false,
  userInfo: [],
  accountNumber: [],
  receiver: [],
  nameAccount: [],
  numberAccount: [],
  nameRemind: [],
  idBank: [],
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
        userInfo: action.user
      };

    case userConstant.LOGIN_SUCCESS:
      localStorage.setItem('isAuth', true);
      localStorage.setItem('user', action.user.fullName);
      localStorage.setItem('role', action.user.role);
      return {
        ...state,
        pendding: false,
        isAuth: true,
      };
    case userConstant.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('x-refresh-token');
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
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
      };
    case userConstant.GET_BENEFICIARY_FAILURE:
      return {
        ...state,
        nameAccount: null,
        numberAccount: null,
        nameRemind: null,
        idBank: null,
        pendding: false,
      };
    case userConstant.GET_BENEFICIARY_SUCCESS:
      return {
        ...state,
        nameAccount: action.nameAccount,
        numberAccount: action.numberAccount,
        nameRemind: action.nameRemind,
        idBank: action.idBank,
        pendding: false,
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

    default:
      return state;
  }
};

export default user;
