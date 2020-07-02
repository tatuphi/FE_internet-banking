import { employeeConstants } from "constants/index";

const initialState = {
  pendding: false,
  errMessage: "",
  listCustomerTransaction: [],
  userResult: {},
};
const employee = (state = initialState, action) => {
  switch (action.type) {
    case employeeConstants.REGISTERBANKACCOUN_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case employeeConstants.REGISTERBANKACCOUN_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case employeeConstants.REGISTERBANKACCOUN_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
      };
    case employeeConstants.APPLYMONEY_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case employeeConstants.APPLYMONEY_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
      };
    case employeeConstants.APPLYMONEY_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case employeeConstants.GET_CUSTOMER_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case employeeConstants.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        listCustomerTransaction: action.listCustomerTransaction,
      };
    case employeeConstants.GET_CUSTOMER_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    case employeeConstants.GET_CUSTOMER_USERID_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case employeeConstants.GET_CUSTOMER_USERID_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        userResult: action.userResult,
      };
    case employeeConstants.GET_CUSTOMER_USERID_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    default:
      return state;
  }
};

export default employee;
