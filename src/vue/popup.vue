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
                <label>Calendar Url: {{calendarData.href}}</label>
                <br>
                <label>Calendar Name: {{calendarData.displayName}}</label>
                <br>
                <label>Calendar Ctag: {{calendarData.getCtag}}</label>
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

    export default {
        el: '#vue-container',
        props: {
            renderLoginForm: {
                type: Boolean,
                default: !StorageService.get(StorageService.APP_PASSWORD)
            },
            loginBtnLabel: {default: Browser.getBrowser().i18n.getMessage("loginBtnLabel", null)},
            logoutBtnLabel: {default: Browser.getBrowser().i18n.getMessage("logoutBtnLabel", null)}
        },
        data() {
            return {
                username: StorageService.get(StorageService.USERNAME),
                password: "",
                calendarData: {}
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
        created() {
            ApiService.init("https://cloud.riscue.xyz");
        },
        mounted() {
            this.fetchCalendar();
        },
        methods: {
            login() {
                UserService.login(this.username, this.password);
                this.renderLoginForm = false;
            },
            logout() {
                UserService.logout();
                this.renderLoginForm = true;
            },
            fetchCalendar() {
                DavService.discover().then(
                    principal => DavService.calendarHomeSet(principal).then(
                        calendarHome => DavService.calendarData(calendarHome).then(
                            result => this.calendarData = result
                        )
                    )
                );
            }
        }
    };
</script>

<style lang="scss">
    @import "~@scss/main.scss";
</style>
