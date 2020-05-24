import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';
import {Validations} from 'ts/typings/validations';
import {PromiseService} from 'ts/services/promise.service';
import {DavService} from 'ts/services/dav.service';
import {StorageService} from 'ts/services/storage.service';
import {UserService} from 'ts/services/user.service';
import {ContextHelper} from 'ts/helpers/context.helper';
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

    private userService: UserService;
    private storageService: StorageService;
    private davService: DavService;
    private promiseService: PromiseService;

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

    init() {
        this.userService = ContextHelper.provide(UserService) as UserService;
        this.storageService = ContextHelper.provide(StorageService) as StorageService;
        this.davService = ContextHelper.provide(DavService) as DavService;
        this.promiseService = ContextHelper.provide(PromiseService) as PromiseService;
    }

    created() {
        this.init();
        this.initializeForm()
    }

    initializeForm() {
        this.form = {
            username: this.storageService.get(StorageService.USERNAME),
            password: !!this.storageService.get(StorageService.PASSWORD) ? '****************' : null,
            serverUrl: this.storageService.get(StorageService.SERVER_URL)
        } as IFormData;
    }

    login() {
        this.loading = true;
        const password = this.form.password === '****************' ? this.storageService.get(StorageService.PASSWORD) : this.form.password;
        this.promiseService.bind(this).then(this.userService.login(this.form.username, password, this.form.serverUrl), () => {
            this.loading = false;
            this.settingsSaved = true;
        });
    }

    clear() {
        this.clearForm();
    }

    reset() {
        this.initializeForm();
    }
}
