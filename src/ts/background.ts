import {ContextHelper} from '@ts/helpers/context.helper';
import {UserService} from '@ts/services/user.service';
import {StorageService} from '@ts/services/storage.service';
import {DavService} from '@ts/services/dav.service';
import {PromiseService} from '@ts/services/promise.service';
import {BrowserApi} from '@tsP/browser-api';

export class Background {

    calendarItems;

    private userService: UserService;
    private storageService: StorageService;
    private davService: DavService;
    private promiseService: PromiseService;

    init() {
        ContextHelper.buildContext();

        BrowserApi.getBrowserApi().runtime.onMessage.addListener((m, s) => {
            return this.receiveMessage(m, s);
        });

        this.userService = ContextHelper.provide<UserService>(UserService);
        this.storageService = ContextHelper.provide<StorageService>(StorageService);
        this.davService = ContextHelper.provide<DavService>(DavService);
        this.promiseService = ContextHelper.provide<PromiseService>(PromiseService);

        if (this.userService.isLoggedIn()) {
            this.fetchCalendar();
        }
    }

    private fetchCalendar() {
        this.promiseService.bind(this).then(this.davService.discover(), (principal) => {
            this.promiseService.bind(this).then(this.davService.calendarHomeSet(principal), (calendarHome) => {
                this.promiseService.bind(this).then(this.davService.calendarData(calendarHome), (result) => {
                    this.promiseService.bind(this).then(this.davService.downloadCalendar(result.href), (calendarItems) => {
                        this.calendarItems = calendarItems;
                    });
                });
            });
        });
    }

    private receiveMessage(message, sender = null) {
        console.log(message, sender);
        return new Promise(
            (resolve, reject) => {
                this.processMessage(message.type, message.data)
                    .then(resolve)
                    .catch(reject);
            }
        );
    }

    private async processMessage(type, data) {
        switch (type) {
            case 'calendaritems.get':
                return this.calendarItems;
            case 'options.getForm':
                return {
                    username: this.storageService.get(StorageService.USERNAME),
                    password: !!this.storageService.get(StorageService.PASSWORD) ? '****************' : null,
                    serverUrl: this.storageService.get(StorageService.SERVER_URL)
                };
            case 'options.login':
                const password = data.password === '****************' ? this.storageService.get(StorageService.PASSWORD) : data.password;
                await this.userService.login(data.username, password, data.serverUrl);
                this.fetchCalendar();
                return true;
        }
    }
}

new Background().init();
