import {StorageService} from "@js/services/StorageService";
import {ApiService} from "@js/services/ApiService";
import {AuthenticationError} from "@js/errors/AuthenticationError";

export const UserService = {

    async login(username, password) {
        const requestData = {
            method: 'get',
            url: "/ocs/v2.php/core/getapppassword",
            headers: {"OCS-APIRequest": true},
            auth: {
                username: username,
                password: password
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);
            const apppassword = response.data.ocs.data.apppassword;

            StorageService.save(StorageService.USERNAME, username);
            StorageService.save(StorageService.APP_PASSWORD, apppassword);

            return apppassword;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    async logout() {
        try {
            const requestData = {
                method: 'delete',
                url: "/ocs/v2.php/core/apppassword",
                headers: {"OCS-APIRequest": true},
                auth: {
                    username: StorageService.get(StorageService.USERNAME),
                    password: StorageService.get(StorageService.APP_PASSWORD)
                }
            };
            ApiService.customRequest(requestData);
        } catch (error) {
        }
        StorageService.clear();
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
