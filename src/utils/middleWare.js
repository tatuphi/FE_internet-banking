import API from "config/axios.config";
import history from "config/history.config";
const handleCatch = (dispatch, call, err) => {
  if (err.response) {
    const { data, status } = err.response;

    if (data.error) {
      console.log("mo", data.error);
      dispatch(call(data.error.message));

      let accessToken = localStorage.getItem("token");
      let refreshToken = localStorage.getItem("x-refresh-token");
      let role = localStorage.getItem("role");

      if (status === 408) {
        API.post("/auth//refresh", { accessToken, refreshToken })
          .then((res) => {
            console.log(res.data.accessToken);
            localStorage.setItem("token", res.data.accessToken);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (status === 402) {
        history.push("/");
      }
      if (status === 401) {
        history.push("/login");
      }
    } else dispatch(call("OPPs! Something wrong"));
  } else {
    dispatch(call("OPPs! Something wrong"));
  }
};

export default handleCatch;
