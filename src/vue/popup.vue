<template>
    <div id="popup">
        <div v-if="renderLoginForm">
            <input type="text" id="username" v-model="username">
            <input type="password" id="password" v-model="password">
            <button type="button" id="login" @click="login()">{{loginBtnLabel}}</button>
        </div>
        <div v-if="!renderLoginForm">
            <center>
                <button @click="logout()">{{logoutBtnLabel}}</button>
                <br>
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
    import {Browser} from "@jsP/browser";
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
            loginBtnLabel: {default: Browser.getBrowser().i18n.getMessage("loginBtnLabel", null)},
            logoutBtnLabel: {default: Browser.getBrowser().i18n.getMessage("logoutBtnLabel", null)}
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
            Browser.getBrowserInfo().then(console.log);
        },
        mounted: function () {
            if (UserService.isLoggedIn()) {
                this.fetchCalendar();
            }
        },
        methods: {
            login: function () {
                PromiseService.bind(this).then(UserService.login(this.username, this.password), () => {
                    this.renderLoginForm = false;
                    this.fetchCalendar();
                });
            },
            logout: function () {
                PromiseService.bind(this).then(UserService.logout(), () => {
                    this.renderLoginForm = true;
                    this.calendarData = {};
                });
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
