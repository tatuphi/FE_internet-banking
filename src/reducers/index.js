import { combineReducers } from "redux";
import user from "./user.reducer";
import employee from "./employee.reducer";
import transaction from './transaction.reducer';
import dept from './dept.reducer';
import history from './history.reducer'
export default combineReducers({
  user,
  employee,
  transaction,
  dept,
  history,
});
