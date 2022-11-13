const enabledBtn = document.getElementById("enabled");
const enabledLabel = document.getElementById("enabled-label");
const slider = document.getElementById("sens-range");

function doCheck(isChecked) {
    chrome.storage.local.set({checked: isChecked});
    enabledBtn.checked = isChecked;
    enabledLabel.innerText = isChecked ? "negative vibes FILTERED" : "filtering OFF";
    chrome.tabs.query({currentWindow: true, active: true}, tabs =>
        chrome.tabs.sendMessage(tabs[0].id, {title: "toggle", value: isChecked}, (res) => chrome.runtime.lastError)
    );
}

function setSens(val) {
    chrome.storage.local.set({sens: val});
    slider.value = val;
    chrome.tabs.query({currentWindow: true, active: true}, tabs =>
        chrome.tabs.sendMessage(tabs[0].id, {title: "sens", value: val}, (res) => chrome.runtime.lastError)
    );
}

chrome.storage.local.get(["checked"], result => {
    doCheck("checked" in result && result.checked);
});

enabledBtn.addEventListener("change", () => {
    doCheck(enabledBtn.checked);
});

chrome.storage.local.get(["sens"], result => {
    setSens("sens" in result ? result.sens : 2);
})

slider.addEventListener("change", () => {
    setSens(slider.value);
})
