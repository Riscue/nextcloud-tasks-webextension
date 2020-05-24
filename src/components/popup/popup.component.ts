import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {BrowserApi} from '@tsP/browser-api';
import template from './popup.component.html'
import style from './popup.component.scss'

@Component({
    template,
    style
})
export default class PopupComponent extends Vue {

    initialized = false;
    calendarItems;
    openSettingsWindowButton = BrowserApi.getBrowserApi().i18n.getMessage('OpenSettingsWindowButton', null);

    created() {
        BrowserApi.getBrowserApi().runtime.sendMessage({type: 'calendaritems.get'}).then((response) => {
            this.calendarItems = response;
            this.initialized = true;
        });
    }

    openSettings() {
        BrowserApi.getBrowserApi().runtime.openOptionsPage();
        window.close();
    }
}
