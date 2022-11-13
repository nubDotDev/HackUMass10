const enabledBtn = document.getElementById("enabled");
const enabledLabel = document.getElementById("enabled-label");

function doCheck(isChecked) {
    localStorage.setItem('checked', String(isChecked));
    enabledLabel.innerText = isChecked ? "negative vibes FILTERED" : "filtering OFF";
    chrome.tabs.query({currentWindow: true, active: true}, tabs =>
        chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: isChecked}, (res) => chrome.runtime.lastError)
    );
}

//localStorage.removeItem('checked');
let storedChecked = localStorage.getItem('checked') === "true" ? true : false;
enabledBtn.checked = storedChecked;
doCheck(storedChecked);

enabledBtn.addEventListener("change", function (event) {
    let isChecked = enabledBtn.checked;
    doCheck(isChecked);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === "get-enabled") {
        let enabled = message.value || false;
        if (enabled) censor();
        sendResponse(enabled.checked);
    }
});