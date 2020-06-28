import { historyConstants } from "constants/index";

const initialState = {
    pendingHistory: false,
    errHistory: " ",
    listHistory: []

};
const history = (state = initialState, action) => {
    switch (action.type) {
        case historyConstants.GET_HISTORY_PAYMENT_REQUEST:
            return {
                ...state,
                pendingHistory: true,
            };
        case historyConstants.GET_HISTORY_PAYMENT_FAILURE:
            return {
                ...state,
                pendingHistory: false,
                errHistory: action.error,
            };
        case historyConstants.GET_HISTORY_PAYMENT_SUCCESS:
            return {
                ...state,
                pendingHistory: false,
                errHistory: "",
                listHistory: action.listHistory,
            };



        default:
            return state;
    }
};

export default history;
