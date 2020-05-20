<template src="./PopupComponent.html"/>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {BrowserApi} from '@jsP/browser-api';
    import {UserService} from '@js/services/user.service';
    import {StorageService} from '@js/services/storage.service';
    import {DavService} from '@js/services/dav.service';
    import {PromiseService} from '@js/services/promise.service';
    import {ContextHelper} from '@js/helpers/context.helper';
    import './PopupComponent.scss'

    @Component
    export default class PopupComponent extends Vue {

        private userService: UserService;
        private storageService: StorageService;
        private davService: DavService;
        private promiseService: PromiseService;

        username = '';
        password = '';
        openSettingsWindowButton = BrowserApi.getBrowserApi().i18n.getMessage('OpenSettingsWindowButton', null);
        calendarData = {href: ''};
        calendarItems = [];

        init() {
            this.userService = ContextHelper.provide(UserService) as UserService;
            this.storageService = ContextHelper.provide(StorageService) as StorageService;
            this.davService = ContextHelper.provide(DavService) as DavService;
            this.promiseService = ContextHelper.provide(PromiseService) as PromiseService;
        }

        created() {
            this.init();
            BrowserApi.getBrowserInfo().then(console.log);

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
    };
</script>
