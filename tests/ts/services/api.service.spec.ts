/* tslint:disable:no-string-literal */
import {StorageService} from '@ts/services/storage.service';
import {ApiService} from '@ts/services/api.service';
import {AxiosRequestConfig, Method} from 'axios';

describe('Test Api Service', () => {
    const mockStorageService = new StorageService();
    const apiService = new ApiService(mockStorageService);

    const mockUrl = 'mockUrl';
    const mockData = 'mockData';
    const mockPassword = 'mockPassword';
    const mockAuth = {username: 'mockUsername', password: mockPassword}
    const mockConfig: AxiosRequestConfig = {baseURL: 'mockBaseUrl'};
    const result: AxiosRequestConfig = {
        method: 'GET',
        url: `mockStorageServiceValue${mockUrl}`,
        auth: mockAuth,
        ...mockConfig
    };

    beforeEach(() => {
        spyOn(StorageService.prototype, 'get').and.returnValue('mockStorageServiceValue');
        spyOn<any>(ApiService.prototype, '_customRequest').and.returnValue('mockApiService_customRequestValue');

        delete result.data;
    })

    afterEach(() => {
        expect(ApiService.prototype['_customRequest']).toHaveBeenCalledOnceWith(result);
        expect(StorageService.prototype.get).toHaveBeenCalledOnceWith(StorageService.SERVER_URL);
    })

    it('propfind()', () => {
        result.method = 'PROPFIND' as Method;
        result.data = mockData;
        apiService.propfind(mockUrl, mockData, mockAuth, mockConfig);
    });

    it('report()', () => {
        result.method = 'REPORT' as Method;
        result.data = mockData;
        apiService.report(mockUrl, mockData, mockAuth, mockConfig);
    });

    it('get()', () => {
        result.method = 'GET';
        apiService.get(mockUrl, mockAuth, mockConfig);
    });

    it('post()', () => {
        result.method = 'POST';
        result.data = mockData;
        apiService.post(mockUrl, mockData, mockAuth, mockConfig);
    });

    it('put()', () => {
        result.method = 'PUT';
        result.data = mockData;
        apiService.put(mockUrl, mockData, mockAuth, mockConfig);
    });

    it('delete()', () => {
        result.method = 'DELETE';
        apiService.delete(mockUrl, mockAuth, mockConfig);
    });
});
