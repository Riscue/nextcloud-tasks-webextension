<template>
    <div id="popup">
        <button type="button" id="openSetting" @click="openSettings()">{{OpenSettingsWindowButton}}</button>
        <div v-if="renderLoginForm">
        </div>
        <div v-if="!renderLoginForm">
            <center>
                <label>Username: {{username}}</label>
                <br>
                <label>Calendar Name: {{calendarData.displayName}}</label>
                <ul id="example-1">
                    <li v-for="calendarItem in calendarItems" :key="calendarItem.ics.uuid">
                        {{ calendarItem.ics.summary }}
                    </li>
                </ul>
            </center>
        </div>
    </div>
</template>

<script>
    import {BrowserApi} from "@jsP/browser";
    import {ApiService} from "@js/services/ApiService";
    import {UserService} from "@js/services/UserService";
    import {StorageService} from "@js/services/StorageService";
    import {DavService} from "@js/services/DavService";
    import {PromiseService} from "@js/services/PromiseService";

    export default {
        el: '#vue-container',
        props: {
            renderLoginForm: {
                type: Boolean,
                default: !UserService.isLoggedIn()
            },
            OpenSettingsWindowButton: {default: BrowserApi.getBrowserApi().i18n.getMessage("OpenSettingsWindowButton", null)},
        },
        data: function () {
            return {
                username: StorageService.get(StorageService.USERNAME),
                password: "",
                calendarData: {},
                calendarItems: []
            }
        },
        watch: {
            username(username) {
                this.username = username;
            },
            password(password) {
                this.password = password;
            },
        },
        created: function () {
            ApiService.init("https://cloud.riscue.xyz");
            BrowserApi.getBrowserInfo().then(console.log);
        },
        mounted: function () {
            if (UserService.isLoggedIn()) {
                this.fetchCalendar();
            }
        },
        methods: {
            openSettings: function () {
                BrowserApi.getBrowserApi().runtime.openOptionsPage();
                window.close();
            },
            fetchCalendar: function () {
                PromiseService.bind(this).then(DavService.discover(), principal => {
                    PromiseService.bind(this).then(DavService.calendarHomeSet(principal), calendarHome => {
                        PromiseService.bind(this).then(DavService.calendarData(calendarHome), result => {
                            this.calendarData = result;
                            PromiseService.bind(this).then(DavService.downloadCalendar(this.calendarData.href), calendarItems => {
                                this.calendarItems = calendarItems;
                            });
                        });
                    });
                });
            }
        }
    };
</script>

<style lang="scss">
    @import "~@scss/main.scss";
</style>
