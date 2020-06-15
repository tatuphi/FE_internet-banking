import API from "config/axios.config";
import { transactionConstants } from "constants/index";
import history from "config/history.config";

import authHeader from "../utils/auth-header";


const receiverTransfer = () => {

    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.get(`/transfer/receiver`, { headers: headers })
            .then((res) => {
                console.log('mo : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((err) => dispatch(failure(err)));
    };

    function request() {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_RECEIVE_REQUEST,
        };
    }
    function success(receiver) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_RECEIVE_SUCCESS,
            receiver,
        };
    }

    function failure(err) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_RECEIVE_FAILURE,
            err,
        };
    }
};
const receiverInformation = (idReceiver) => {

    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.get(`/transfer/receiverInformation`, { params: { id: idReceiver }, headers: headers })
            .then((res) => {
                console.log('typeAccount : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((err) => dispatch(failure(err)));
    };

    function request() {
        return {
            type: transactionConstants.RECEIVE_REQUEST,
        };
    }
    function success(receiverUser) {
        return {
            type: transactionConstants.RECEIVE_SUCCESS,
            receiverUser,
        };
    }

    function failure(err) {
        return {
            type: transactionConstants.RECEIVE_FAILURE,
            err,
        };
    }
};

const requestReceiver = (receiver, amountMoney, content, typeSend) => {

    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.post(`/transfer/requestReceiver`,
            { receiver, amountMoney, content, typeSend },
            { headers: headers })
            .then((res) => {
                console.log('transaction : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((err) => {
                dispatch(failure(err.response.data))
                console.log('test1', err.response.data);
            });
    };

    function request() {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_REQUEST,
        };
    }
    function success(transactionUser) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_SUCCESS,
            transactionUser,
        };
    }

    function failure(err) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_FAILURE,
            err,
        };
    }
};
const verifyOTP = (receiver, amountMoney, content, typeSend, code) => {

    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.post(`/transfer/verifyOTP`,
            { receiver, amountMoney, content, typeSend, code },
            { headers: headers })
            .then((res) => {

                console.log('transaction : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((err) => {
                console.log("test", err.response);
                dispatch(failure(err))
            });
    };

    function request() {
        return {
            type: transactionConstants.TRANSFER_REQUEST,
        };
    }
    function success(transferUser) {
        return {
            type: transactionConstants.TRANSFER_SUCCESS,
            transferUser,
        };
    }

    function failure(err) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_FAILURE,
            err,
        };
    }
};


export const transactionActions = {

    receiverTransfer,
    receiverInformation,
    requestReceiver,
    verifyOTP
};