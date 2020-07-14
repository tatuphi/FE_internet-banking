import jwt from 'jsonwebtoken';
import history from '../config/history.config';
import API from "config/axios.config";

const handleCatch = (dispatch, call, err) => {
    if (err.response) {
        const { data, status } = err.response;
        console.log(status);
        console.log("mo1");
        console.log("mo", data);
        if (data.error) {
            console.log("mo", data.error);
            dispatch(call(data.error.message));
            // if (status !== 500) {
            //     localStorage.removeItem("token");
            //     localStorage.removeItem("x-refresh-token");
            //     localStorage.removeItem("isAuth");
            //     localStorage.removeItem("user");
            //     localStorage.removeItem("role");
            //     history.push('/');
            // }
            console.log("mo");
            let accessToken = localStorage.getItem("token");
            let refreshToken = localStorage.getItem("x-refresh-token");


            if (status === 408) {
                API.post("/auth//refresh", { accessToken, refreshToken })
                    .then((res) => {
                        console.log(res.data.accessToken);
                        localStorage.setItem("token", res.data.accessToken);
                    })
                    .catch((error) => {
                        console.log(error);

                    })
            }


        } else dispatch(call('OPPs! Something wrong'));
    } else {
        dispatch(call('OPPs! Something wrong'));
    }
};

export default handleCatch;


