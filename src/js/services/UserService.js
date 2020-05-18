import {StorageService} from "@js/services/StorageService";
import {ApiService} from "@js/services/ApiService";
import {AuthenticationError} from "@js/errors/AuthenticationError";

export const UserService = {

    async login(username, password) {
        try {
            const response = await ApiService.get(
                '/ocs/v2.php/core/getapppassword',
                {username: username, password: password},
                {headers: {"OCS-APIRequest": true}}
            );

            const apppassword = response.data.ocs.data.apppassword;
            StorageService.save(StorageService.USERNAME, username);
            StorageService.save(StorageService.APP_PASSWORD, apppassword);
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail);
        }
    },

    async logout() {
        try {
            await ApiService.delete(
                '/ocs/v2.php/core/apppassword',
                UserService.getCredentials(),
                {headers: {"OCS-APIRequest": true}}
            );

            StorageService.clear();
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail);
        }
    },

    isLoggedIn() {
        return !!StorageService.get(StorageService.APP_PASSWORD);
    },

    getCredentials() {
        return {
            username: StorageService.get(StorageService.USERNAME),
            password: StorageService.get(StorageService.APP_PASSWORD)
        };
    }
};
