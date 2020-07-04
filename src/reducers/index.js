import { combineReducers } from "redux";
import user from "./user.reducer";
import employee from "./employee.reducer";
import transaction from "./transaction.reducer";
import dept from "./dept.reducer";
import history from "./history.reducer";
import admin from "./admin.reducer";
export default combineReducers({
  user,
  employee,
  admin,
  transaction,
  dept,
  history,
});
