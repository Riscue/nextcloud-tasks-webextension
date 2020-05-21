import {AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {Service} from '@ts/services/service';
import * as Settings from '@resources/settings.json'

export class ApiService extends Service {

    constructor() {
        super(ApiService);
    }

    propfind<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'PROPFIND' as Method, url: `${Settings.url}${url}`, data, auth, ...config});
    }

    report<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'REPORT' as Method, url: `${Settings.url}${url}`, data, auth, ...config});
    }

    get<T = any, R = AxiosResponse<T>>(url: string, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'GET' as Method, url: `${Settings.url}${url}`, auth, ...config});
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'POST' as Method, url: `${Settings.url}${url}`, data, auth, ...config});
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'PUT' as Method, url: `${Settings.url}${url}`, data, auth, ...config});
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        return this._customRequest({method: 'DELETE' as Method, url: `${Settings.url}${url}`, auth, ...config});
    }
}
