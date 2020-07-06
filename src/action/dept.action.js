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
                    // conso le.log("iatw", res.data.timeStap);

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

                setTimeout(() => {
                    dispatch(showDeptRemindUnPay())
                }, 15000);

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
const getListNotification = (pageNumber, numberRecord) => {
    // let ts = 0;
    return (dispatch) => {
        dispatch(request());

        API.get("/transfer/getListNotification", {
            params: {
                pageNumber,
                numberRecord,

            },
            headers: authHeader()
        })

            .then((res) => {

                console.log("iatw", res.data.result);
                dispatch(success(res.data.result, pageNumber));
                // }

            }).then(function () {
                getListNotification();
                console.log(2);

            })
            .catch((err) => dispatch(failure(err)));
    };

    function request() {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_REQUEST,
        };
    }
    function success(listNotification, pageNumber) {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_SUCCESS,
            listNotification,
            notiPageNumber: pageNumber,
        };
    }

    function failure(error) {
        return {
            type: deptConstants.GET_DEPT_NOTIFICATION_FAILURE,
            error
        }
    };
};

const getNumUnreadNotification = () => {
    console.log("time", ts);
    return (dispatch) => {
        API.get(`/transfer/getBadgeNumber?ts=${ts}`, { headers: authHeader() })
            .then((res) => {
                if (res.status === 200) {
                    ts = res.data.timeStap;

                    dispatch(success(res.data.result));

                }
            }).then(() => {

                setTimeout(() => {
                    dispatch(getNumUnreadNotification())
                }, 15000);

            })
            .catch((err) => {
                setTimeout(() => {
                    dispatch(getNumUnreadNotification())
                }, 15000);
            });
    };

    function success(numUnreadNotification) {
        return {
            type: deptConstants.GET_UNREADNOTIFICATION,
            numUnreadNotification,
        };
    }
};
const setReadNotification = (notificationId) => {
    return (dispatch) => {
        API.post('/transfer/setReadNotification', { notificationId }, { headers: authHeader() }).then((res) => {
            dispatch(success());
        });
    };

    function success() {
        return {
            type: deptConstants.SET_READ_NOTIFICATION,
        };
    }
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
    getListNotification,
    getNumUnreadNotification,
    setReadNotification
};
