import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';
import {Validations} from 'ts/typings/validations';
import {BrowserApi} from '@tsP/browser-api';
import template from './options.component.html'
import style from './options.component.scss'

const validations: Validations = {
    form: {
        username: {required},
        password: {required},
        serverUrl: {required}
    }
};

interface IFormData {
    username: string;
    password: string;
    serverUrl: string;
}

@Component({
    template,
    style,
    mixins: [validationMixin],
    validations
})
export default class OptionsComponent extends Vue {

    $v: any;
    form: IFormData = {} as IFormData;

    loading = false;
    settingsSaved = false;

    clearForm() {
        this.$v.$reset();
        this.form = {} as IFormData;
    }

    formSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }

        this.login();
    }

    created() {
        this.initializeForm()
    }

    initializeForm() {
        BrowserApi.getBrowserApi().runtime.sendMessage({type: 'options.getForm'}).then((response) => {
            this.form = {
                username: response.username,
                password: response.password,
                serverUrl: response.serverUrl
            };
        });
    }

    login() {
        this.loading = true;

        const data = {
            username: this.form.username,
            password: this.form.password,
            serverUrl: this.form.serverUrl
        };
        BrowserApi.getBrowserApi().runtime.sendMessage({type: 'options.login', data}).then((response) => {
            if (response) {
                this.loading = false;
                this.settingsSaved = true;
            }
        });
    }

    clear() {
        this.clearForm();
    }

    reset() {
        this.initializeForm();
    }
}
