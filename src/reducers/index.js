import { combineReducers } from "redux";
import user from "./user.reducer";
import employee from "./employee.reducer";
import transaction from './transaction.reducer';

export default combineReducers({
  user,
  employee,
  transaction
});
