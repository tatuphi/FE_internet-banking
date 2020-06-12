import { employeeConstants } from "constants/index";

const initialState = {
  pendding: false,
  errMessage: "",
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

    default:
      return state;
  }
};

export default employee;
