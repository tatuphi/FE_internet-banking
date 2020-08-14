import { employeeConstants } from "constants/index";

const initialState = {
	pendding: false,
	errMessage: "",
	listCustomerTransaction: [],
	listCustomer: [],
	pendCustomer: false,
	userResult: {},
	isSuccessCreate: false,
	isApplySuccess: false,
	total: {},
};
const employee = (state = initialState, action) => {
	switch (action.type) {
		case employeeConstants.REGISTERBANKACCOUN_REQUEST:
			return {
				...state,
				pendding: true,
			};
		case employeeConstants.REGISTERBANKACCOUN_FAILURE:
			return {
				...state,
				pendding: false,
				errMessage: action.error,
			};
		case employeeConstants.REGISTERBANKACCOUN_SUCCESS:
			let customer = {
				...action.customer.newUser,
				user: action.customer.saveLoginUser,
			};
			return {
				...state,
				pendding: false,
				errMessage: "",
				isSuccessCreate: true,
				listCustomer: [...state.listCustomer, { ...customer }],
			};
		case employeeConstants.APPLYMONEY_REQUEST:
			return {
				...state,
				pendding: true,
			};
		case employeeConstants.APPLYMONEY_SUCCESS:
			let list = state.listCustomer.find((e) => e._id === action.money._id);
			const index = state.listCustomer.indexOf(list);
			list.currentBalance = action.money.currentBalance;
			let account = [
				...state.listCustomer.slice(0, index),
				list,
				...state.listCustomer.slice(index + 1, state.listCustomer.length),
			];

			return {
				...state,
				pendding: false,
				errMessage: "",
				isApplySuccess: true,
				listCustomer: [...account],
			};
		case employeeConstants.APPLYMONEY_FAILURE:
			return {
				...state,
				pendding: false,
				errMessage: action.error,
			};
		case employeeConstants.GET_CUSTOMER_REQUEST:
			return {
				...state,
				pendding: true,
			};
		case employeeConstants.GET_CUSTOMER_SUCCESS:
			return {
				...state,
				pendding: false,
				errMessage: "",
				listCustomerTransaction: action.listCustomerTransaction.transaction,
				total: action.listCustomerTransaction.total[0],
			};
		case employeeConstants.GET_CUSTOMER_FAILURE:
			return {
				...state,
				pendding: false,
				errMessage: action.error,
			};
		case employeeConstants.GET_CUSTOMER_USERID_REQUEST:
			return {
				...state,
				pendding: true,
			};
		case employeeConstants.GET_CUSTOMER_USERID_SUCCESS:
			return {
				...state,
				pendding: false,
				errMessage: "",
				userResult: action.userResult,
			};
		case employeeConstants.GET_CUSTOMER_USERID_FAILURE:
			return {
				...state,
				pendding: false,
				errMessage: action.error,
			};
		case employeeConstants.GET_CUSTOMER_LIST_REQUEST:
			return {
				...state,
				pendCustomer: true,
			};
		case employeeConstants.GET_CUSTOMER_LIST_SUCCESS:
			return {
				...state,
				pendCustomer: false,
				errMessage: "",
				listCustomer: action.listCustomer,
			};
		case employeeConstants.GET_CUSTOMER_LIST_FAILURE:
			return {
				...state,
				pendCustomer: false,
				errMessage: action.error,
			};
		default:
			return state;
	}
};

export default employee;
