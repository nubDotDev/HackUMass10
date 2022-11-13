let activeTabId, lastUrl, lastTitle;


function getTabInfo(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        if(lastUrl != tab.url || lastTitle != tab.title)
        console.log(lastUrl = tab.url, lastTitle = tab.title);
    });

    chrome.storage.local.get(['checked'], function(result) {
        let val = "checked" in result && result.checked;
        chrome.tabs.query({currentWindow: true, active: true}, tabs =>
            chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: true}, (res) => chrome.runtime.lastError)
        );
    });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(activeTabId == tabId) {
    getTabInfo(tabId);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === "toggle") {
        let enabled = message.value || false;
        if (enabled) censor();
        sendResponse(enabled);
    }
}); 