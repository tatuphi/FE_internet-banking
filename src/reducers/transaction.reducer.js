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
    penTran: false,
    errsave: " ",
    penGetBank: false,
    getBank: [],
    errBank: " ",
    errDelete: " ",
    pendDelete: false,
    successDelete: false,
    editReceiver: [],
    pendEdit: false,
    errEdit: " ",
    successEdit: false



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
                errsave: null,
            };
        case transactionConstants.SAVE_RECEIVE_SUCCESS:

            let list = { ...action.saveInfoReceiver.saveInfo, linkedbank: action.saveInfoReceiver.link }
            return {
                ...state,
                pend: false,
                saveInfoReceiver: action.saveInfoReceiver,
                receiver: [...state.receiver, { ...list }],
                errsave: null,


            };
        case transactionConstants.SAVE_RECEIVE_FAILURE:
            return {
                ...state,
                pend: false,
                errsave: action.error,
            }
        case transactionConstants.TRANSACTION_LINK_BANK_REQUEST:
            return {
                ...state,
                pendding: true,
                errMessage: null,
                showNextModal: false

            };
        case transactionConstants.TRANSACTION_LINK_BANK_SUCCESS:
            return {
                ...state,
                pendding: false,
                transactionUser: action.transactionUser,
                errMessage: null,
                showNextModal: true,
                receiver: [...state.receiver, action.transactionUser]

            };
        case transactionConstants.TRANSACTION_LINK_BANK_FAILURE:
            return {
                ...state,
                pendding: false,
                errMessage: action.error,
                transactionUser: [],
                showNextModal: false,


            };
        case transactionConstants.VERIFY_OTP_LINK_BANK_REQUEST:
            return {
                ...state,
                penTran: true,
                errMess: null,
                successModal: false,


            };
        case transactionConstants.VERIFY_OTP_LINK_BANK_SUCCESS:
            return {
                ...state,
                penTran: false,
                transferUser: action && action.transferUser,
                errMess: null,
                successModal: true,


            };
        case transactionConstants.VERIFY_OTP_LINK_BANK_FAILURE:
            return {
                ...state,
                penTran: false,
                errMess: action && action.error,
                transferUser: [],
                successModal: false,

            };

        case transactionConstants.GET_LINK_BANK_REQUEST:
            return {
                ...state,
                penGetBank: true,
                errBank: null,


            };
        case transactionConstants.GET_LINK_BANK_SUCCESS:
            return {
                ...state,
                penGetBank: false,
                getBank: action && action.getBank,
                errBank: null,



            };
        case transactionConstants.DELETE_RECEIVER_REQUEST:
            return {
                ...state,

                pendDelete: true,

            };

        case transactionConstants.DELETE_RECEIVER_SUCCESS:
            return {
                ...state,
                pendDelete: false,

                receiver: [...state.receiver.filter(e => e._id !== action.receiverId)],
                errDelete: null,
                successDelete: true


            };
        case transactionConstants.DELETE_RECEIVER_FAILURE:
            return {
                ...state,
                pendDelete: false,
                errDelete: action.error,
            }
        case transactionConstants.EDIT_RECEIVE_REQUEST:
            return {
                ...state,

                pendEdit: true,

            };


        case transactionConstants.EDIT_RECEIVE_SUCCESS:
            let save = { ...action.editReceiver.receiver, linkedbank: action.editReceiver.link }
            console.log("hh", save);
            return {
                ...state,
                pendEdit: false,
                editReceiver: action.editReceiver,
                successEdit: true,
                errEdit: " ",
                receiver: [...state.receiver.filter(e => e._id !== action.editReceiver.receiver._id), { ...save }],


            };
        case transactionConstants.EDIT_RECEIVE_FAILURE:
            return {
                ...state,
                pendEdit: false,
                errEdit: action.error,
            }

        default:
            return state;
    }
};

export default transaction;
