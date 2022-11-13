let activeTabId;


function getTabInfo(tabId) {
    chrome.storage.local.get(["checked"], function(result) {
        let val = "checked" in result && result.checked;
        chrome.tabs.query({currentWindow: true, active: true}, tabs =>
            chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: val}, (res) => chrome.runtime.lastError)
        );
    });
    chrome.storage.local.get(["sens"], function(result) {
        let val = "sens" in result ? result.sens : 2;
        chrome.tabs.query({currentWindow: true, active: true}, tabs =>
            chrome.tabs.sendMessage(tabs[0].id, {title: "sens", value: val}, (res) => chrome.runtime.lastError)
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
