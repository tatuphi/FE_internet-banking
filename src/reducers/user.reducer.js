import { userConstant } from "constants/index";

const initialState = {
  isLogined: false,
  pendding: false,
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

    default:
      return state;
  }
};

export default user;
