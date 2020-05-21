import {Service} from '@ts/services/service';

export class StorageService extends Service {
    public static readonly USERNAME = 'username';
    public static readonly PASSWORD = 'password';
    public static readonly SERVER_URL = 'serverUrl';
    public static readonly APP_PASSWORD = 'apppassword';

    constructor() {
        super(StorageService);
    }

    clear() {
        this.remove(StorageService.APP_PASSWORD);
    }

    get(key) {
        return localStorage.getItem(key);
    }

    save(key, data) {
        localStorage.setItem(key, data);
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}
