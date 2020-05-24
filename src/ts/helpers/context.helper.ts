import {Service} from '@ts/services/service';
import {ApiService} from '@ts/services/api.service';
import {DavService} from '@ts/services/dav.service';
import {UserService} from '@ts/services/user.service';
import {StorageService} from '@ts/services/storage.service';
import {PromiseService} from '@ts/services/promise.service';

export class ContextHelper {

    private static context: Service[] = [];

    static provide<T extends Service>(serviceType: any): T {
        return this.context.filter(service => service.type === serviceType)[0] as T;
    }

    static buildContext() {
        const promiseService = new PromiseService();
        const storageService = new StorageService();
        const apiService = new ApiService(storageService);
        const userService = new UserService(storageService, apiService);
        const davService = new DavService(apiService, userService);

        this.context.push(promiseService);
        this.context.push(storageService);
        this.context.push(apiService);
        this.context.push(userService);
        this.context.push(davService);
    }
}
