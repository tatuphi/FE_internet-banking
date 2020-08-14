import { historyConstants } from "constants/index";

const initialState = {
	pendingHistory: false,
	errHistory: " ",
	listHistory: [],
	total: {},
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
				listHistory: action.listHistory.transaction,
				total: action.listHistory.total[0],
			};

		default:
			return state;
	}
};

export default history;
