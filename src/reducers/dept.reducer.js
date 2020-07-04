import { deptConstants } from "constants/index";
// import { deptActions } from 'action/dept.action'

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
    penDelete: false,
    errDelete: "",
    pendNotification: false,
    errNotif: " ",
    listNotification: [],

};
const dept = (state = initialState, action) => {
    switch (action.type) {
        case deptConstants.GET_DEPT_REQUEST:
            return {
                ...state,
                pendding: true,
            };
        case deptConstants.GET_DEPT_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
            };
        case deptConstants.GET_DEPT_SUCCESS:
            return {
                ...state,
                pendding: false,
                errMessage: "",
                listDept: action.listDept,
            };
        case deptConstants.GET_REMIND_REQUEST:
            return {
                ...state,
                pendRe: true,
            };
        case deptConstants.GET_REMIND_FAILURE:
            // deptActions.showDeptRemindUnPay()

            return {
                ...state,
                pendRe: false,
                errMessage: action.error,
            };
        case deptConstants.GET_REMIND_SUCCESS:
            // deptActions.showDeptRemindUnPay()
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

        case deptConstants.DELETE_DEPT_REMIND_REQUEST:
            return {
                ...state,
                penDelete: true,
            };
        case deptConstants.DELETE_DEPT_REMIND_FAILURE:
            return {
                ...state,
                penDelete: false,
                errDelete: action.error,

            };
        case deptConstants.DELETE_DEPT_REMIND_SUCCESS:
            console.log("action.reminerId", action.reminderId)
            return {
                ...state,
                penDelete: false,
                errDelete: "",
                listDept: [...state.listDept.filter(e => e._id !== action.reminderId)],
                isDeleteSuccess: true,
                listReminder: [...state.listReminder.filter(e => e._id !== action.reminderId)]

            };
        case deptConstants.GET_DEPT_NOTIFICATION_REQUEST:
            return {
                ...state,
                pendNotification: true,
            };

        case deptConstants.GET_DEPT_NOTIFICATION_FAILURE:
            return {
                ...state,
                pendNotification: false,
                errNotif: action.error,
            };
        case deptConstants.GET_DEPT_NOTIFICATION_SUCCESS:
            return {
                ...state,
                pendNotification: false,
                errNotif: "",
                listNotification: action.listNotification,
            };




        default:
            return state;
    }
};

export default dept;
