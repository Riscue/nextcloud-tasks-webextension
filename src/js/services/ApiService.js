import axios from 'axios';

export const ApiService = {

    init: function (baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    propfind: function (url, data, credentials, config = {}) {
        config.method = 'PROPFIND';
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    },

    report: function (url, data, credentials, config = {}) {
        config.method = 'REPORT';
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    },

    get: function (url, credentials, config = {}) {
        config.auth = credentials;
        return axios.get(url, config);
    },

    post: function (url, data, credentials, config = {}) {
        config.auth = credentials;
        return axios.post(url, data, config);
    },

    put: function (url, data, credentials, config = {}) {
        config.auth = credentials;
        return axios.put(url, data, config);
    },

    delete: function (url, credentials, config = {}) {
        config.auth = credentials;
        return axios.delete(url, config);
    }
};
