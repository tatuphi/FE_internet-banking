export default function authHeader() {

    const token = localStorage.getItem('token');

    if (token) {
        const headers = {
            'x-access-token': token,
        }
        return headers;
    }
    else {
        return {}
    }
}
