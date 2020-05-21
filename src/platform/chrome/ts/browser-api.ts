import {browser} from 'webextension-polyfill-ts'
import {UAParser} from 'ua-parser-js';

export class BrowserApi {

    static getBrowserApi() {
        return browser;
    }

    static async getBrowserInfo() {
        const browserInfo = new UAParser(navigator.userAgent).getBrowser();
        const platformInfo = await BrowserApi.getBrowserApi().runtime.getPlatformInfo();
        return {
            name: browserInfo.name,
            version: browserInfo.version,
            os: platformInfo.os,
            arch: platformInfo.arch,
            vendor: navigator.vendor
        };
    }

}
