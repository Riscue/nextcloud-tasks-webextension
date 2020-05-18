export const StorageService = {
    USERNAME: 'username',
    APP_PASSWORD: 'apppassword',

    clear() {
        this.remove(StorageService.APP_PASSWORD);
    },

    get(key) {
        return localStorage.getItem(key);
    },

    save(key, data) {
        localStorage.setItem(key, data);
    },

    remove(key) {
        localStorage.removeItem(key);
    },
};
