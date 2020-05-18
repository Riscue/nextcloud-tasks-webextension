<template>
    <div id="popup">
        <div v-if="renderLoginForm">
            <input type="text" id="username" v-model="username">
            <input type="password" id="password" v-model="password">
            <button type="button" id="login" @click="login()">{{loginBtnLabel}}</button>
        </div>
        <div v-if="!renderLoginForm">
            <label>{{username}}</label>
            <button @click="logout()">{{logoutBtnLabel}}</button>
            <button @click="getMethod()">Send Get Request</button>
        </div>
    </div>
</template>

<script>
    import {Browser} from "@jsP/browser";
    import {ApiService} from "@js/services/ApiService";
    import {UserService} from "@js/services/UserService";
    import {StorageService} from "@js/services/StorageService";

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
        methods: {
            login() {
                UserService.login(this.username, this.password);
                this.renderLoginForm = false;
            },
            logout() {
                UserService.logout();
                this.renderLoginForm = true;
            },
            getMethod() {
            }
        }
    };
</script>

<style lang="scss">
    @import "~@scss/main.scss";
</style>
