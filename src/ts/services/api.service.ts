import axios, {AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {Service} from '@ts/services/service';
import * as Settings from '@resources/settings.json'

export class ApiService extends Service {

    constructor() {
        super(ApiService);
    }

    propfind<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.method = 'PROPFIND' as Method;
        config.url = `${Settings.url}${url}`;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    }

    report<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.method = 'REPORT' as Method;
        config.url = `${Settings.url}${url}`;
        config.data = data;
        config.auth = credentials;
        return axios.request(config);
    }

    get<T = any, R = AxiosResponse<T>>(url: string, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        const _url = `${Settings.url}${url}`;
        return axios.get(_url, config);
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        const _url = `${Settings.url}${url}`;
        return axios.post(_url, data, config);
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data: any, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        const _url = `${Settings.url}${url}`;
        return axios.put(_url, data, config);
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, credentials: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        config.auth = credentials;
        const _url = `${Settings.url}${url}`;
        return axios.delete(_url, config);
    }
}
