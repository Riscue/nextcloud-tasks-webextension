import {Service} from '@js/services/service';
import {ApiService} from '@js/services/api.service';
import {DavService} from '@js/services/dav.service';
import {UserService} from '@js/services/user.service';
import {StorageService} from '@js/services/storage.service';
import {PromiseService} from '@js/services/promise.service';

export class ContextHelper {

    private static context: Service[] = [];

    static provide<T extends Service>(serviceType: any): T {
        return this.context.filter(service => service.type === serviceType)[0] as T;
    }

    static buildContext() {
        this.context.push(new ApiService('https://cloud.riscue.xyz'));
        this.context.push(new PromiseService());
        this.context.push(new StorageService());
        this.context.push(new UserService(ContextHelper.provide(StorageService), ContextHelper.provide(ApiService)));
        this.context.push(new DavService(ContextHelper.provide(ApiService), ContextHelper.provide(UserService)));
    }
}
