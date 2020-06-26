import { deptConstants } from "constants/index";

const initialState = {
    pendding: false,
    errMessage: "",
    listDept: [],
    addDept: [],
    editDept: [],
    pen: false,
    errMess: "",
    listReminder: [],
    pendRe: false,

};
const dept = (state = initialState, action) => {
    switch (action.type) {
        case deptConstants.GET_DEPT_REMIND_REQUEST:
            return {
                ...state,
                pendding: true,
            };
        case deptConstants.GET_DEPT_REMIND_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
            };
        case deptConstants.GET_DEPT_REMIND_SUCCESS:
            return {
                ...state,
                pendding: false,
                errMessage: "",
                listDept: action.listDept,
            };
        case deptConstants.GET_DEPT_REMINDER_REQUEST:
            return {
                ...state,
                pendRe: true,
            };
        case deptConstants.GET_DEPT_REMINDER_FAILURE:
            return {
                ...state,
                pendRe: false,
                errMessage: action.error,
            };
        case deptConstants.GET_DEPT_REMINDER_SUCCESS:
            return {
                ...state,
                pendRe: false,
                errMessage: "",
                listReminder: action.listReminder,
            };


        case deptConstants.ADD_DEPT_REMIND_REQUEST:
            return {
                ...state,
                pendding: true,
            };
        case deptConstants.ADD_DEPT_REMIND_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
            };
        case deptConstants.ADD_DEPT_REMIND_SUCCESS:
            return {
                ...state,
                pendding: false,
                errMessage: "",
                addDept: action.addDept,
            };
        case deptConstants.EDIT_DEPT_REMIND_REQUEST:
            return {
                ...state,
                pen: true,
            };
        case deptConstants.EDIT_DEPT_REMIND_FAILURE:
            return {
                ...state,
                pen: false,
                errMess: action.error,
            };
        case deptConstants.EDIT_DEPT_REMIND_SUCCESS:
            return {
                ...state,
                pen: false,
                errMess: "",
                editDept: action.editDept,
            };


        default:
            return state;
    }
};

export default dept;
