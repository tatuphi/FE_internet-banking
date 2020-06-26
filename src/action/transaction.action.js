import API from "config/axios.config";
import { transactionConstants } from "constants/index";
import history from "config/history.config";

import authHeader from "../utils/auth-header";


const receiverTransfer = (dataSent) => {

    console.log('1', dataSent);
    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.get(`/transfer/receiver`, { params: dataSent, headers: headers })
            .then((res) => {
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
            .catch((error) => {
                const { data } = error.response;
                if (data.error) {
                    return dispatch(
                        failure(data.error.message) || "OOPs! something wrong"
                    );
                }
                return dispatch(failure(error) || "OOPs! something wrong");
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

    function failure(error) {
        return {
            type: transactionConstants.TRANSACTION_LOCAL_FAILURE,
            error,
        };
    }
};
const verifyOTP = (receiver, amountMoney, content, typeSend, code, typeTransaction, idRemind) => {

    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.post(`/transfer/verifyOTP`,
            { receiver, amountMoney, content, typeSend, code, typeTransaction, idRemind },
            { headers: headers })
            .then((res) => {

                console.log('transaction : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((error) => {
                const { data } = error.response;
                if (data.error) {
                    return dispatch(
                        failure(data.error.message) || "OOPs! something wrong"
                    );
                }
                return dispatch(failure(error) || "OOPs! something wrong");
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

    function failure(error) {
        return {
            type: transactionConstants.TRANSFER_FAILURE,
            error,
        };
    }
};
const saveReceiverInformation = (accountNumber, idBank, nameRemind) => {

    return (dispatch) => {

        return new Promise((resolve, reject) => {
            let headers = authHeader();
            dispatch(request());

            API.post(`/transfer/receivers`, { accountNumber, idBank, nameRemind }, { headers: headers })
                .then((res) => {
                    console.log('typeAccount : ', res.data.result);
                    dispatch(success(res.data.result));
                    resolve(res.data.result)
                })
                .catch((error) => {
                    console.log(error);
                    const { data } = error.response;
                    if (data.error) {
                        return dispatch(
                            failure(data.error.message) || "OOPs! something wrong"
                        );
                    }
                    return dispatch(failure(error) || "OOPs! something wrong");
                    reject();
                });

        })
    };

    function request() {
        return {
            type: transactionConstants.SAVE_RECEIVE_REQUEST,
        };
    }
    function success(saveInfoReceiver) {
        return {
            type: transactionConstants.SAVE_RECEIVE_SUCCESS,
            saveInfoReceiver,
        };
    }

    function failure(error) {
        return {
            type: transactionConstants.SAVE_RECEIVE_FAILURE,
            error,
        };
    }
};

const linkBankAccount = (nameBank, content, amountMoney, receiver, typeSend) => {
    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.post(`/user/linkBankAccount`,
            { nameBank, content, amountMoney, receiver, typeSend },
            { headers: headers })
            .then((res) => {
                console.log('transaction1 : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((error) => {
                const { data } = error.response;
                console.log('1', data.error.message);
                if (data.error) {
                    return dispatch(

                        failure(data.error.message) || "OOPs! something wrong"
                    );
                }
                return dispatch(failure(error) || "OOPs! something wrong");
            });
    };

    function request() {
        return {
            type: transactionConstants.TRANSACTION_LINK_BANK_REQUEST,
        };
    }
    function success(transactionUser) {
        return {
            type: transactionConstants.TRANSACTION_LINK_BANK_SUCCESS,
            transactionUser,
        };
    }

    function failure(error) {
        return {
            type: transactionConstants.TRANSACTION_LINK_BANK_FAILURE,
            error,
        };
    }
};
const verifyOTPLinkBank = (nameBank, content, amountMoney, receiver, typeSend, code) => {
    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.post(`/user/verifyOTP`,
            { nameBank, content, amountMoney, receiver, typeSend, code },
            { headers: headers })
            .then((res) => {
                console.log('transaction1 : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((error) => {
                const { data } = error.response;
                console.log('1', data.error.message);
                if (data.error) {
                    return dispatch(

                        failure(data.error.message) || "OOPs! something wrong"
                    );
                }
                return dispatch(failure(error) || "OOPs! something wrong");
            });
    };

    function request() {
        return {
            type: transactionConstants.VERIFY_OTP_LINK_BANK_REQUEST,
        };
    }
    function success(transferUser) {
        return {
            type: transactionConstants.VERIFY_OTP_LINK_BANK_SUCCESS,
            transferUser,
        };
    }

    function failure(error) {
        return {
            type: transactionConstants.VERIFY_OTP_LINK_BANK_FAILURE,
            error,
        };
    }
};
const getLinkBank = () => {
    return (dispatch) => {
        let headers = authHeader();
        dispatch(request());

        API.get(`/user/getNameBankLink`,
            { headers: headers })
            .then((res) => {
                console.log('transaction1 : ', res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((error) => {
                const { data } = error.response;
                console.log('1', data.error.message);
                if (data.error) {
                    return dispatch(

                        failure(data.error.message) || "OOPs! something wrong"
                    );
                }
                return dispatch(failure(error) || "OOPs! something wrong");
            });
    };

    function request() {
        return {
            type: transactionConstants.GET_LINK_BANK_REQUEST,
        };
    }
    function success(getBank) {
        return {
            type: transactionConstants.GET_LINK_BANK_SUCCESS,
            getBank,
        };
    }

    function failure(error) {
        return {
            type: transactionConstants.GET_LINK_BANK_FAILURE,
            error,
        };
    }

}



export const transactionActions = {
    receiverTransfer,
    receiverInformation,
    requestReceiver,
    verifyOTP,
    saveReceiverInformation,
    linkBankAccount,
    verifyOTPLinkBank,
    getLinkBank
};
