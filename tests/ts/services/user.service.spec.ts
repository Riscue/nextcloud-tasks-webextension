import {UserService} from '@ts/services/user.service';
import {StorageService} from '@ts/services/storage.service';
import {ApiService} from '@ts/services/api.service';

describe('Test User Service', () => {
    const mockStorageService = new StorageService();
    const mockApiService = new ApiService(mockStorageService);
    const userService = new UserService(mockStorageService, mockApiService);

    beforeEach(() => {
        spyOn(StorageService.prototype, 'get').and.returnValue('mockStorageServiceValue');
        spyOn(StorageService.prototype, 'save');
        spyOn(StorageService.prototype, 'clear');
    })

    it('login()', async () => {
        const mockUsername = 'mockUsername';
        const mockPassword = 'mockPassword';
        const mockServerUrl = 'mockServerUrl';
        const mockAppPassword = 'mockApiServiceReturnValue';

        const value = {data: {ocs: {data: {apppassword: mockAppPassword}}}};
        spyOn(ApiService.prototype, 'get').and.returnValue(Promise.resolve(value));

        await userService.login(mockUsername, mockPassword, mockServerUrl);

        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.USERNAME, mockUsername);
        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.PASSWORD, mockPassword);
        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.SERVER_URL, mockServerUrl);
        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.APP_PASSWORD, mockAppPassword);
    });

    it('login() -> fail call', async () => {
        const mockUsername = 'mockUsername';
        const mockPassword = 'mockPassword';
        const mockServerUrl = 'mockServerUrl';

        const value = {response: {status: 'mockStatus', data: {detail: 'mockDetail'}}};
        spyOn(ApiService.prototype, 'get').and.returnValue(Promise.reject(value));

        await expectAsync(userService.login(mockUsername, mockPassword, mockServerUrl)).toBeRejectedWithError('mockDetail');

        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.USERNAME, mockUsername);
        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.PASSWORD, mockPassword);
        expect(StorageService.prototype.save).toHaveBeenCalledWith(StorageService.SERVER_URL, mockServerUrl);
    });


    it('logout()', async () => {
        spyOn(ApiService.prototype, 'delete').and.returnValue(Promise.resolve());

        await userService.logout();

        expect(StorageService.prototype.clear).toHaveBeenCalledOnceWith();
    });

    it('logout() -> fail call', async () => {
        const value = {response: {status: 'mockStatus', data: {detail: 'mockDetail'}}};
        spyOn(ApiService.prototype, 'delete').and.returnValue(Promise.reject(value));

        await expectAsync(userService.logout()).toBeRejectedWithError('mockDetail');
    });

    it('isLoggedIn()', () => {
        const loggedIn = userService.isLoggedIn();

        expect(StorageService.prototype.get).toHaveBeenCalledWith(StorageService.APP_PASSWORD);
        expect(loggedIn).toBe(true);
    });

    it('getCredentials()', () => {
        const credentials = userService.getCredentials();

        expect(StorageService.prototype.get).toHaveBeenCalledWith(StorageService.USERNAME);
        expect(StorageService.prototype.get).toHaveBeenCalledWith(StorageService.APP_PASSWORD);
        expect(credentials.username).toBe('mockStorageServiceValue');
        expect(credentials.password).toBe('mockStorageServiceValue');
    });
});
