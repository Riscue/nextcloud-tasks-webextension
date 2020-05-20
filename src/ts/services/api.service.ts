import axios, {AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {Service} from '@ts/services/service';

export class ApiService extends Service {

    constructor(baseURL: string) {
        super(ApiService);
        axios.defaults.baseURL = baseURL;
    }

    propfind<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.method = 'PROPFIND' as Method;
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    }

    report<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.method = 'REPORT' as Method;
        config.url = url;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        return axios.get(url, config);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        return axios.post(url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        return axios.put(url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        return axios.delete(url, config);
    }
}
