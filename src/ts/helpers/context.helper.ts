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
        this.context.push(new PromiseService());
        this.context.push(new StorageService());
        this.context.push(new ApiService(ContextHelper.provide(StorageService)));
        this.context.push(new UserService(ContextHelper.provide(StorageService), ContextHelper.provide(ApiService)));
        this.context.push(new DavService(ContextHelper.provide(ApiService), ContextHelper.provide(UserService)));
    }
}
