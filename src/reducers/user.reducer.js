import { userConstant } from "constants/index";

const initialState = {
  token: localStorage.getItem('token'),
  isLogined: false,
  pendding: false,
  userInfo: null,
  accountNumber: [],
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
        isLogined: true
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
        isLogined: true
      };
    case userConstant.GET_ACCOUNT_NUMBER_FAILURE:
      return {
        ...state,
        accountNumber: null,
        pending: false,
      };

    default:
      return state;
  }
};

export default user;
