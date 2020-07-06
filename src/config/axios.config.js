import axios from 'axios';
require("dotenv").config();

export default axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL
    baseURL: `https://mpbinternetbanking.herokuapp.com`,
    // baseURL: ` http://localhost:5000`,
    timeout: 15000

});
