import API from "config/axios.config";
import { transactionConstants } from "constants/index";
import handleCatch from "../utils/middleWare";

import authHeader from "../utils/auth-header";

const receiverTransfer = (dataSent) => {
  console.log("1", dataSent);
  return (dispatch) => {
    let headers = authHeader();
    console.log("token", headers);
    dispatch(request());

    API.get(`/transfer/receiver`, { params: dataSent, headers: headers })
      .then((res) => {
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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

    API.get(`/transfer/receiverInformation`, {
      params: { id: idReceiver },
      headers: headers,
    })
      .then((res) => {
        console.log("typeAccount : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
      });
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

    API.post(
      `/transfer/requestReceiver`,
      { receiver, amountMoney, content, typeSend },
      { headers: headers }
    )
      .then((res) => {
        console.log("transaction : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
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
const verifyOTP = (
  receiver,
  amountMoney,
  content,
  typeSend,
  code,
  typeTransaction,
  nameBank,
  idRemind
) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let headers = authHeader();
      dispatch(request());

      API.post(
        `/transfer/verifyOTP`,
        {
          receiver,
          amountMoney,
          content,
          typeSend,
          code,
          typeTransaction,
          nameBank,
          idRemind,
        },
        { headers: headers }
      )
        .then((res) => {
          console.log("transaction : ", res.data.result);
          dispatch(success(res.data.result));
          resolve(res.data.result);
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
          reject();
        });
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
const saveReceiverInformation = (
  accountNumber,
  idBank,
  nameBeneficiary,
  nameRemind
) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let headers = authHeader();
      dispatch(request());

      API.post(
        `/transfer/receivers`,
        { accountNumber, idBank, nameBeneficiary, nameRemind },
        { headers: headers }
      )
        .then((res) => {
          console.log("typeAccount : ", res.data.result);
          dispatch(success(res.data.result));
          resolve(res.data.result);
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
          reject();
        });
    });
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
const editReceiverInformation = (
  id,
  accountNumber,
  idBank,
  nameBeneficiary,
  nameRemind
) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let headers = authHeader();
      dispatch(request());

      API.post(
        `/transfer/updateReceiver`,
        { id, accountNumber, idBank, nameBeneficiary, nameRemind },
        { headers: headers }
      )
        .then((res) => {
          console.log("typeAccount : ", res.data.result);
          dispatch(success(res.data.result));
          resolve(res.data.result);
        })
        .catch((error) => {
          handleCatch(dispatch, failure, error);
          reject();
        });
    });
  };

  function request() {
    return {
      type: transactionConstants.EDIT_RECEIVE_REQUEST,
    };
  }
  function success(editReceiver) {
    return {
      type: transactionConstants.EDIT_RECEIVE_SUCCESS,
      editReceiver,
    };
  }

  function failure(error) {
    return {
      type: transactionConstants.EDIT_RECEIVE_FAILURE,
      error,
    };
  }
};
const deleteReceiver = (receiverId) => {
  return (dispatch) => {
    let headers = authHeader();
    dispatch(request());

    API.post(`/transfer/receiver`, { receiverId }, { headers: headers })
      .then((res) => {
        console.log("typeAccount : ", res.data.result);
        dispatch(success(res.data.result, receiverId));
      })
      .catch((error) => {
        console.log(error);
        handleCatch(dispatch, failure, error);
      });
  };

  function request() {
    return {
      type: transactionConstants.DELETE_RECEIVER_REQUEST,
    };
  }
  function success(saveInfoReceiver, receiverId) {
    return {
      type: transactionConstants.DELETE_RECEIVER_SUCCESS,
      saveInfoReceiver,
      receiverId,
    };
  }

  function failure(error) {
    return {
      type: transactionConstants.DELETE_RECEIVER_FAILURE,
      error,
    };
  }
};

const linkBankAccount = (
  nameBank,
  content,
  amountMoney,
  receiver,
  typeSend
) => {
  return (dispatch) => {
    let headers = authHeader();
    dispatch(request());

    API.post(
      `/user/linkBankAccount`,
      { nameBank, content, amountMoney, receiver, typeSend },
      { headers: headers }
    )
      .then((res) => {
        console.log("transaction1 : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
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
const verifyOTPLinkBank = (
  nameBank,
  content,
  amountMoney,
  receiver,
  typeSend,
  code
) => {
  return (dispatch) => {
    let headers = authHeader();
    dispatch(request());

    API.post(
      `/user/verifyOTP`,
      { nameBank, content, amountMoney, receiver, typeSend, code },
      { headers: headers }
    )
      .then((res) => {
        console.log("transaction1 : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
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

    API.get(`/user/getNameBankLink`, { headers: headers })
      .then((res) => {
        console.log("transaction1 : ", res.data.result);
        dispatch(success(res.data.result));
      })
      .catch((error) => {
        handleCatch(dispatch, failure, error);
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
};

export const transactionActions = {
  receiverTransfer,
  receiverInformation,
  requestReceiver,
  verifyOTP,
  saveReceiverInformation,
  linkBankAccount,
  verifyOTPLinkBank,
  getLinkBank,
  deleteReceiver,
  editReceiverInformation,
};
