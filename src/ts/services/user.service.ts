import {StorageService} from '@ts/services/storage.service';
import {ApiService} from '@ts/services/api.service';
import {AuthenticationError} from '@ts/errors/authentication.error';
import {Service} from '@ts/services/service';

export class UserService extends Service {

    constructor(private storageService: StorageService,
                private apiService: ApiService) {
        super(UserService);
    }

    async login(username: string, password: string, serverUrl: string) {
        try {
            this.storageService.save(StorageService.USERNAME, username);
            this.storageService.save(StorageService.PASSWORD, password);
            this.storageService.save(StorageService.SERVER_URL, serverUrl);
            const response: any = await this.apiService.get(
                '/ocs/v2.php/core/getapppassword',
                {username, password},
                {headers: {'OCS-APIRequest': true}}
            );

            this.storageService.save(StorageService.APP_PASSWORD, response.data.ocs.data.apppassword);
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail);
        }
    }

    async logout() {
        try {
            await this.apiService.delete(
                '/ocs/v2.php/core/apppassword',
                this.getCredentials(),
                {headers: {'OCS-APIRequest': true}}
            );

            this.storageService.clear();
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail);
        }
    }

    isLoggedIn() {
        return Boolean(this.storageService.get(StorageService.APP_PASSWORD));
    }

    getCredentials() {
        return {
            username: this.storageService.get(StorageService.USERNAME),
            password: this.storageService.get(StorageService.APP_PASSWORD)
        };
    }
}
