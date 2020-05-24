import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {BrowserApi} from 'platform/chrome/ts/browser-api';
import {UserService} from 'ts/services/user.service';
import {StorageService} from 'ts/services/storage.service';
import {DavService} from 'ts/services/dav.service';
import {PromiseService} from 'ts/services/promise.service';
import {ContextHelper} from 'ts/helpers/context.helper';
import template from './popup.component.html'
import style from './popup.component.scss'

@Component({
    template,
    style
})
export default class PopupComponent extends Vue {

    username = '';
    password = '';
    openSettingsWindowButton = BrowserApi.getBrowserApi().i18n.getMessage('OpenSettingsWindowButton', null);
    calendarData = {href: ''};
    calendarItems = [];

    private userService: UserService;
    private storageService: StorageService;
    private davService: DavService;
    private promiseService: PromiseService;

    init() {
        this.userService = ContextHelper.provide(UserService) as UserService;
        this.storageService = ContextHelper.provide(StorageService) as StorageService;
        this.davService = ContextHelper.provide(DavService) as DavService;
        this.promiseService = ContextHelper.provide(PromiseService) as PromiseService;
    }

    created() {
        this.init();
        this.username = this.storageService.get(StorageService.USERNAME);
    }

    mounted() {
        if (this.userService.isLoggedIn()) {
            this.fetchCalendar();
        }
    }

    openSettings() {
        BrowserApi.getBrowserApi().runtime.openOptionsPage();
        window.close();
    }

    fetchCalendar() {
        this.promiseService.bind(this).then(this.davService.discover(), (principal) => {
            this.promiseService.bind(this).then(this.davService.calendarHomeSet(principal), (calendarHome) => {
                this.promiseService.bind(this).then(this.davService.calendarData(calendarHome), (result) => {
                    this.calendarData = result;
                    this.promiseService.bind(this).then(this.davService.downloadCalendar(this.calendarData.href), (calendarItems) => {
                        this.calendarItems = calendarItems;
                    });
                });
            });
        });
    }
}
