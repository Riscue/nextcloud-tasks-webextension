import {AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {Service} from '@ts/services/service';
import {StorageService} from '@ts/services/storage.service';

export class ApiService extends Service {

    constructor(private storageService: StorageService) {
        super(ApiService);
    }

    propfind<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'PROPFIND' as Method, url: `${serverUrl}${url}`, data, auth, ...config});
    }

    report<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'REPORT' as Method, url: `${serverUrl}${url}`, data, auth, ...config});
    }

    get<T = any, R = AxiosResponse<T>>(url: string, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'GET' as Method, url: `${serverUrl}${url}`, auth, ...config});
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'POST' as Method, url: `${serverUrl}${url}`, data, auth, ...config});
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data: any, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'PUT' as Method, url: `${serverUrl}${url}`, data, auth, ...config});
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, auth: AxiosBasicCredentials, config: AxiosRequestConfig): Promise<R> {
        const serverUrl = this.storageService.get(StorageService.SERVER_URL);
        return this._customRequest({method: 'DELETE' as Method, url: `${serverUrl}${url}`, auth, ...config});
    }
}
