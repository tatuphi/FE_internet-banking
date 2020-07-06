import { adminConstants } from "constants/index";

const initialState = {
  pendding: false,
  errMessage: "",
  listEmployee: [],
  createEmployee: [],
  updateEmployee: {},
  getEmployee: {},
  listHistoryLinkBank: [],
  total: {},
  pend: false,
  errsave: "",
  pendDelete: false,
  errDelete: "",
  successDelete: false,
  issucess: false,
  updatePending: false,
  updateErr: "",
  UpdateSuccess: false
};
const admin = (state = initialState, action) => {
  switch (action.type) {
    case adminConstants.GET_ALL_EMPLOYEE_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case adminConstants.GET_ALL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        listEmployee: action.listEmployee,
      };
    case adminConstants.GET_ALL_EMPLOYEE_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };

    case adminConstants.CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case adminConstants.CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        createEmployee: action.createEmployee,
        listEmployee: [
          ...state.listEmployee,
          { ...action.createEmployee.saveLoginUser },
        ],
        issucess: true
      };
    case adminConstants.CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };

    case adminConstants.GET_EMPLOYEE_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case adminConstants.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        getEmployee: action.getEmployee,
      };
    case adminConstants.GET_EMPLOYEE_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };

    case adminConstants.UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        updatePending: true,
      };
    case adminConstants.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        updatePending: false,
        UpdateSuccess: true,
        updateErr: "",
        updateEmployee: action.updateEmployee,
        listEmployee: [
          ...state.listEmployee.filter((e) => e._id !== action.idEditEmployee),
          { ...action.updateEmployee },
        ],
      };
    case adminConstants.UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        updatePending: false,
        updateErrs: action.error,
      };

    case adminConstants.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case adminConstants.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        errDelete: null,
        successDelete: true,
        listEmployee: [
          ...state.listEmployee.filter((e) => e._id !== action.employeeId),
        ],
      };
    case adminConstants.DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };

    case adminConstants.GET_TRANSACTION_OTHERBANK_REQUEST:
      return {
        ...state,
        pendding: true,
      };
    case adminConstants.GET_TRANSACTION_OTHERBANK_SUCCESS:
      return {
        ...state,
        pendding: false,
        errMessage: "",
        listHistoryLinkBank: action.listHistoryLinkBank,
        total: action.total,
      };
    case adminConstants.GET_TRANSACTION_OTHERBANK_FAILURE:
      return {
        ...state,
        pendding: false,
        errMessage: action.error,
      };
    default:
      return state;
  }
};
export default admin;
