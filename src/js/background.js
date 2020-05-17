let isChrome = !browser.runtime.getBrowserInfo;

if (isChrome) {
    browser = chrome;
}

browser.runtime.onMessage.addListener(processMessage);

function processMessage(msg, sender, sendResponse) {
    console.log(msg.type);
}

browser.tabs.onActivated.addListener(() => onEvent('tabs.onActivated'));
browser.tabs.onCreated.addListener(() => onEvent('tabs.onCreated'));
browser.tabs.onUpdated.addListener(() => onEvent('tabs.onUpdated'));
browser.tabs.onReplaced.addListener(() => onEvent('tabs.onReplaced'));
browser.storage.onChanged.addListener(() => onEvent('storage.onChanged'));

function onEvent(str) {
    console.log(str);
}
