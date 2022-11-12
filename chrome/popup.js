const enabled = document.getElementById("enabled");

enabled.addEventListener("change", () => {
    chrome.tabs.query({currentWindow: true, active: true}, tabs =>
        chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: enabled.checked}, (res) => chrome.runtime.lastError)
    );
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === "get-enabled") {
        enabled = message.value || false;
        if (enabled) censor();
        sendResponse(enabled.checked);
    }
});