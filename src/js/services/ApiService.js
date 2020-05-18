import axios from 'axios'
import {StorageService} from './StorageService'

export const ApiService = {

    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        ApiService.setHeader();
    },

    setHeader() {
        axios.defaults.headers.common["OCS-APIRequest"] = true;
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request.status === 401) {
                    if (error.config.url.includes('/o/token/')) {
                        // store.dispatch('auth/logout');
                        throw error
                    } else {
                        try {
                            // await store.dispatch('auth/refreshToken');
                            return this.customRequest({
                                method: error.config.method,
                                url: error.config.url,
                                data: error.config.data
                            })
                        } catch (e) {
                            throw error;
                        }
                    }
                }

                throw error;
            }
        )
    },

    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor)
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    customRequest(data) {
        return axios(data)
    }
};
