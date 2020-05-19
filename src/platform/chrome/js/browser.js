import polyfill from 'webextension-polyfill';
import UaParser from 'ua-parser-js';

export class BrowserApi {

    static getBrowserApi () {
        return polyfill;
    }

    static async getBrowserInfo () {
        const browserInfo = new UaParser(navigator.userAgent).getBrowser();
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
