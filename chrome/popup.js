const enabledBtn = document.getElementById("enabled");
const enabledLabel = document.getElementById("enabled-label");

function doCheck(isChecked) {
    //localStorage.setItem('checked', String(isChecked));
    chrome.storage.local.set({checked: isChecked}, function() {
        console.log('Value is set to ' + isChecked);
    });
    enabledLabel.innerText = isChecked ? "negative vibes FILTERED" : "filtering OFF";
    chrome.tabs.query({currentWindow: true, active: true}, tabs =>
        chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: isChecked}, (res) => chrome.runtime.lastError)
    );
}

chrome.storage.local.get(['checked'], function(result) {
    let val = "checked" in result && result.checked;
    doChecked(val);
});

enabledBtn.addEventListener("change", function (event) {
    let isChecked = enabledBtn.checked;
    doCheck(isChecked);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === "toggle") {
        let enabled = message.value || false;
        if (enabled) censor();
        sendResponse(enabled);
    }
});
