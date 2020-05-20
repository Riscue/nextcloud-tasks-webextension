import {StorageService} from '@js/services/storage.service';
import {ApiService} from '@js/services/api.service';
import {AuthenticationError} from '@js/errors/authentication.error';
import {Service} from '@js/services/service';

export class UserService extends Service {

    constructor(private storageService: StorageService,
                private apiService: ApiService) {
        super(UserService);
    }

    async login(username, password) {
        try {
            const response = await this.apiService.get(
                '/ocs/v2.php/core/getapppassword',
                {
                    username: username,
                    password: password
                },
                {headers: {'OCS-APIRequest': true}}
            );

            const apppassword = response.data.ocs.data.apppassword;
            this.storageService.save(StorageService.USERNAME, username);
            this.storageService.save(StorageService.APP_PASSWORD, apppassword);
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
