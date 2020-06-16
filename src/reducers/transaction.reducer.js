import { transactionConstants } from "constants/index";

const initialState = {

    pendding: false,
    errMessage: "",
    sendOTP: false,
    userInfo: null,
    accountNumber: [],
    receiver: [],
    receiverUser: [],
    transactionUser: [],
    showNextModal: false,
    transferUser: [],
    errMess: '',
    successModal: false,
    saveInfoReceiver: [],
    pend: false,
    penTran: false


};

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case transactionConstants.TRANSACTION_LOCAL_RECEIVE_REQUEST:
            return {
                ...state,
                pendding: true,
                errMessage: null,
            };
        case transactionConstants.TRANSACTION_LOCAL_RECEIVE_SUCCESS:
            return {
                ...state,
                pendding: false,
                receiver: action.receiver,
                errMessage: null,
            };
        case transactionConstants.TRANSACTION_LOCAL_RECEIVE_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
                receiver: [],
            };
        case transactionConstants.RECEIVE_REQUEST:
            return {
                ...state,
                pendding: true,
                errMessage: null,
            };
        case transactionConstants.RECEIVE_SUCCESS:
            return {
                ...state,
                pendding: false,
                receiverUser: action.receiverUser,
                errMessage: null,
            };
        case transactionConstants.RECEIVE_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
            };
        case transactionConstants.TRANSACTION_LOCAL_REQUEST:
            return {
                ...state,
                pendding: true,
                errMessage: null,
                showNextModal: false

            };
        case transactionConstants.TRANSACTION_LOCAL_SUCCESS:
            return {
                ...state,
                pendding: false,
                transactionUser: action.transactionUser,
                errMessage: null,
                showNextModal: true

            };
        case transactionConstants.TRANSACTION_LOCAL_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
                transactionUser: [],
                showNextModal: false,


            };
        case transactionConstants.TRANSFER_REQUEST:
            return {
                ...state,
                penTran: true,
                errMess: null,
                successModal: false,


            };
        case transactionConstants.TRANSFER_SUCCESS:
            return {
                ...state,
                penTran: false,
                transferUser: action && action.transferUser,
                errMess: null,
                successModal: true,


            };
        case transactionConstants.TRANSFER_FAILURE:
            return {
                ...state,
                penTran: false,
                errMess: action && action.error,
                transferUser: [],
                successModal: false,

            };
        case transactionConstants.SAVE_RECEIVE_REQUEST:
            return {
                ...state,
                pend: true,
                errMessage: null,
            };
        case transactionConstants.SAVE_RECEIVE_SUCCESS:
            return {
                ...state,
                pend: false,
                saveInfoReceiver: action.saveInfoReceiver,
                errMessage: null,
            };
        case transactionConstants.SAVE_RECEIVE_FAILURE:
            return {
                ...state,
                pend: false,
                errMessage: action.error,
            }

        default:
            return state;
    }
};

export default transaction;
