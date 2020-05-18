import axios from 'axios'

export const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    propfind(url, data, credentials, config = {}) {
        config.method = "PROPFIND";
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    },

    report(url, data, credentials, config = {}) {
        config.method = "REPORT";
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    },

    get(url, credentials, config = {}) {
        config.auth = credentials;
        return axios.get(url, config);
    },

    post(url, data, credentials, config = {}) {
        config.auth = credentials;
        return axios.post(url, data, config);
    },

    put(url, data, credentials, config = {}) {
        config.auth = credentials;
        return axios.put(url, data, config);
    },

    delete(url, credentials, config = {}) {
        config.auth = credentials;
        return axios.delete(url, config);
    },
};
