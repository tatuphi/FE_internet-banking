import API from "config/axios.config";
import { deptConstants } from "constants/index";
import history from "config/history.config";
import authHeader from "../utils/auth-header";

const showDeptRemind = () => {
    return (dispatch) => {
        dispatch(request());

        API.get("/transfer/showDeptRemind", { headers: authHeader() })
            .then((res) => {
                console.log(res.data.result);
                dispatch(success(res.data.result));
            })
            .catch((err) => dispatch(failure(err)));
    };

    function request() {
        return {
            type: deptConstants.GET_DEPT_REQUEST,
        };
    }
    function success(listDept) {
        return {
            type: deptConstants.GET_DEPT_SUCCESS,
            listDept,
        };
    }

    function failure(error) {
        return {
            type: deptConstants.GET_DEPT_FAILURE,
            error
        }
    };
};
let ts = 0;
const showDeptRemindUnPay = () => {

    console.log("time", ts);
    return (dispatch) => {
        dispatch(request());

        API.get(`/transfer/showDeptRemindUnPay?ts=${ts}`, { headers: authHeader() })
            .then((res) => {
                if (res.status === 200) {
                    ts = res.data.timeStap;
                    // console.log("iatw", res.data.timeStap);

                    dispatch(success(res.data.result));
                    // dispatch(showDeptRemindUnPay())
                }
            })
            .then(() => {

                setTimeout(() => {
                    dispatch(showDeptRemindUnPay())
                }, 15000);

            })
            .catch((err) => {
                // console.log("hjdhdhd555");
                // showDeptRemindUnPay();

                dispatch(failure(err))
                dispatch(showDeptRemindUnPay())


            });
    };

    function request() {
        return {
            type: deptConstants.GET_REMIND_REQUEST,
        };
    }
    function success(listReminder) {
        //showDeptRemindUnPay();

        return {
            type: deptConstants.GET_REMIND_SUCCESS,
            listReminder,
        };
    }

    function failure(error) {
        //showDeptRemindUnPay();

        return {
            type: deptConstants.GET_REMIND_FAILURE,
            error
        }
    };
};
const getNotification = () => {
    // let ts = 0;
    return (dispatch) => {
        dispatch(request());

        API.get("/transfer/getListNotification", { headers: authHeader() })
            .then((res) => {

                console.log("iatw", res.data.result);
                dispatch(success(res.data.result));
                // }

            }).then(function () {
                getNotification();
                console.log(2);

            })
            .catch((err) => dispatch(failure(err)));
    };

    function request() {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_REQUEST,
        };
    }
    function success(listReminder) {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_SUCCESS,
            listReminder,
        };
    }

    function failure(error) {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_FAILURE,
            error
        }
    };
};
const requestDept = (numberAccount, amountMoney, content) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            API.post("/transfer/requestDept", { numberAccount, amountMoney, content }, { headers: authHeader() })
                .then((res) => {
                    console.log(res.data.result);
                    dispatch(success(res.data.result));
                    resolve(res.data.result)
                })
                .catch((error) => {
                    const { data } = error.response;
                    console.log('1', data.error.message);
                    if (data.error) {
                        return dispatch(

                            failure(data.error.message) || "OOPs! something wrong"
                        );
                    }
                    reject()
                    return dispatch(failure(error) || "OOPs! something wrong");
                });

        });
    };

    function request() {
        return {
            type: deptConstants.ADD_DEPT_REMIND_REQUEST,
        };
    }
    function success(addDept) {
        return {
            type: deptConstants.ADD_DEPT_REMIND_SUCCESS,
            addDept,
        };
    }

    function failure(error) {
        return {
            type: deptConstants.ADD_DEPT_REMIND_FAILURE,
            error
        }
    };

};
const deleteReminder = (reminderId, content) => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            API.post("/transfer/deleteReminder", { reminderId, content }, { headers: authHeader() })
                .then((res) => {
                    console.log(res.data.result);
                    dispatch(success(res.data.result, reminderId));
                    resolve(res.data.result)
                })
                .catch((error) => {
                    const { data } = error.response;
                    console.log('1', data.error.message);
                    if (data.error) {
                        return dispatch(

                            failure(data.error.message) || "OOPs! something wrong"
                        );
                    }
                    reject()
                    return dispatch(failure(error) || "OOPs! something wrong");
                });

        });
    };

    function request() {
        return {
            type: deptConstants.DELETE_DEPT_REMIND_REQUEST,
        };
    }
    function success(addDept, reminderId) {
        return {
            type: deptConstants.DELETE_DEPT_REMIND_SUCCESS,
            addDept,
            reminderId
        };
    }

    function failure(error) {
        return {
            type: deptConstants.DELETE_DEPT_REMIND_FAILURE,
            error
        }
    };

};
// const deleteReminder = (reminderId, content) => {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             API.post('/transfer/deleteReminder', {
//                 reminderId, content
//             }, { headers: authHeader() })
//                 .then((res) => {
//                     resolve('true');
//                     console.log("test", res.data.result);
//                 })
//                 .catch((err) => reject(err));
//         });
//     };
// };

const updateReminder = (sentData) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            API.post("/transfer/updateReminder", { sentData }, { headers: authHeader() })
                .then((res) => {
                    console.log(res.data.result);
                    dispatch(success(res.data.result));
                    resolve(res.data.result)
                })
                .catch((error) => {
                    const { data } = error.response;
                    console.log('1', data.error.message);
                    if (data.error) {
                        return dispatch(

                            failure(data.error.message) || "OOPs! something wrong"
                        );
                    }
                    reject()
                    return dispatch(failure(error) || "OOPs! something wrong");
                });

        });
    };

    function request() {
        return {
            type: deptConstants.EDIT_DEPT_REMIND_REQUEST,
        };
    }
    function success(editDept) {
        return {
            type: deptConstants.EDIT_DEPT_REMIND_SUCCESS,
            editDept,
        };
    }

    function failure(error) {
        return {
            type: deptConstants.EDIT_DEPT_REMIND_FAILURE,
            error
        }
    };

};
export const deptActions = {
    showDeptRemind,
    requestDept,
    deleteReminder,
    showDeptRemindUnPay,
    updateReminder,
    getNotification
};
