import {StorageService} from '@ts/services/storage.service';
import {ApiService} from '@ts/services/api.service';
import axios, {AxiosRequestConfig} from 'axios';

describe('Test Service', () => {

    const mockUrl = 'mockUrl';
    const mockPassword = 'mockPassword';
    const mockAuth = {username: 'mockUsername', password: mockPassword}
    const mockConfig: AxiosRequestConfig = {baseURL: 'mockBaseUrl'};
    const result: AxiosRequestConfig = {
        method: 'GET',
        url: `mockStorageServiceValue${mockUrl}`,
        auth: mockAuth,
        ...mockConfig
    };

    const mockStorageService = new StorageService();
    const apiService: ApiService = new ApiService(mockStorageService);

    it('_customRequest()', () => {
        spyOn(axios, 'request');
        spyOn(StorageService.prototype, 'get').and.returnValue('mockStorageServiceValue');

        apiService.get(mockUrl, mockAuth, mockConfig);

        expect(axios.request).toHaveBeenCalledOnceWith(result);
    });
});
