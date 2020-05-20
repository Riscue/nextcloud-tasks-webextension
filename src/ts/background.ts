import {BrowserApi} from '@tsP/browser-api';

function processMessage(msg, sender) {
    console.log(msg.type);
}

function onEvent(str) {
    console.log(str);
}

const browser = BrowserApi.getBrowserApi();
browser.runtime.onMessage.addListener(processMessage);

browser.tabs.onActivated.addListener(() => onEvent('tabs.onActivated'));
browser.tabs.onCreated.addListener(() => onEvent('tabs.onCreated'));
browser.tabs.onUpdated.addListener(() => onEvent('tabs.onUpdated'));
browser.tabs.onReplaced.addListener(() => onEvent('tabs.onReplaced'));
browser.storage.onChanged.addListener(() => onEvent('storage.onChanged'));
