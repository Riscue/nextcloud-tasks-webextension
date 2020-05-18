import axios from 'axios'
import {StorageService} from './StorageService'

export const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    customRequest(data) {
        return axios(data)
    }
};
