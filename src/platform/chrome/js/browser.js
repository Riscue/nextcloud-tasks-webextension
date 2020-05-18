import polyfill from 'webextension-polyfill';
import UaParser from 'ua-parser-js';

export class Browser {

    static getBrowser() {
        return polyfill;
    }

    static async getBrowserInfo() {
        let parser = new UaParser(navigator.userAgent),
            app = parser.getBrowser(),
            os = await Browser.getBrowser().runtime.getPlatformInfo(),
            device = os.os === 'android' ? 'mobile' : 'desktop';

        return {
            device,
            os: os.os,
            arch: os.arch,
            name: app.name,
            vendor: 'Google',
            version: app.version
        };
    }
}

