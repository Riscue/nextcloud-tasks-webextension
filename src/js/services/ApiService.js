import axios from 'axios'

export const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    propfind(url, data, credentials, config) {
        config = config || {};
        config.method = "PROPFIND";
        config.url = url;
        config.data = data;
        config.auth = credentials || undefined;

        return axios.request(config);
    },

    customRequest(data) {
        return axios.request(data);
    }
};
