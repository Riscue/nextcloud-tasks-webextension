import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export abstract class Service {

    constructor(public type: any) {
    }

    protected _customRequest<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return axios.request(config);
    }
}
