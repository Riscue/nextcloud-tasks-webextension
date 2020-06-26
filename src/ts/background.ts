import {ContextHelper} from '@ts/helpers/context.helper';
import {UserService} from '@ts/services/user.service';
import {StorageService} from '@ts/services/storage.service';
import {DavService} from '@ts/services/dav.service';
import {PromiseService} from '@ts/services/promise.service';
import {BrowserApi} from '@tsP/browser-api';
import {CalendarItemHelper} from '@ts/helpers/calendar-item.helper';
import {CalendarItem} from '@ts/typings/types';

export class Background {

    private calendarItems;

    private userService: UserService;
    private storageService: StorageService;
    private davService: DavService;
    private promiseService: PromiseService;
    private initialized = false;
    private calendarData: any;

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
                    this.calendarData = result;
                    this.downloadCalendar();
                });
            });
        });
    }

    private downloadCalendar() {
        this.promiseService.bind(this).then(this.davService.downloadCalendar(this.calendarData.href), (calendarItems: CalendarItem[]) => {
            this.calendarItems = CalendarItemHelper.preprocess(calendarItems);
            this.initialized = true;
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
            case 'calendaritems.refresh':
                this.downloadCalendar();
                return {
                    success: true
                };
            case 'calendaritems.get':
                return {
                    success: this.initialized,
                    data: this.calendarItems
                };
            case 'options.getForm':
                return {
                    success: true,
                    data: {
                        username: this.storageService.get(StorageService.USERNAME),
                        password: !!this.storageService.get(StorageService.PASSWORD) ? '****************' : null,
                        serverUrl: this.storageService.get(StorageService.SERVER_URL)
                    }
                };
            case 'options.login':
                const password = data.password === '****************' ? this.storageService.get(StorageService.PASSWORD) : data.password;
                await this.userService.login(data.username, password, data.serverUrl);
                this.fetchCalendar();
                return {
                    success: true
                };
        }
    }
}

new Background().init();
