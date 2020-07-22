import API from "config/axios.config";
import { historyConstants } from "constants/index";

import authHeader from "../utils/auth-header";
import handleCatch from "../utils/middleWare"

const transactionHistory = (sentData) => {
    return (dispatch) => {
        // return new Promise((resolve, reject) => {
        dispatch(request());

        API.get("/history/historyTransaction", { params: sentData, headers: authHeader() })
            .then((res) => {
                console.log(res.data.result);
                dispatch(success(res.data.result));
                // resolve(res.data.result)
            })
            .catch((error) => {
                handleCatch(dispatch, failure, error);
            });

        // });
    };

    function request() {
        return {
            type: historyConstants.GET_HISTORY_PAYMENT_REQUEST,
        };
    }
    function success(listHistory) {
        return {
            type: historyConstants.GET_HISTORY_PAYMENT_SUCCESS,
            listHistory,
        };
    }

    function failure(error) {
        return {
            type: historyConstants.GET_HISTORY_PAYMENT_FAILURE,
            error
        }
    };

};


export const historyActions = {
    transactionHistory
};
