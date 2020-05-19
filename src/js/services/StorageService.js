export const StorageService = {
    USERNAME: 'username',
    APP_PASSWORD: 'apppassword',

    clear: function () {
        this.remove(StorageService.APP_PASSWORD);
    },

    get: function (key) {
        return localStorage.getItem(key);
    },

    save: function (key, data) {
        localStorage.setItem(key, data);
    },

    remove: function (key) {
        localStorage.removeItem(key);
    }
};
