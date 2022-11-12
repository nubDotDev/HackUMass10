let enabled = false;

const censorStyle = document.createElement("style");
censorStyle.classList.add("censor-style");
censorStyle.innerHTML = `
color: transparent;
text-shadow: 0 0 5px rgba(0,0,0,0.5);
`;

chrome.runtime.sendMessage({title: "get-enabled"}, (res) => {
    enabled = res;
    if (enabled) censor();
    else decensor();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.title === "toggle") {
        enabled = message.value || false;
        if (enabled) censor();
        else decensor();
        sendResponse("Vibe Checkr toggled");
    }
});

function censor() {
    if (document.getElementsByTagName("censored").length === 0) {
        const toCensor = getCensorable();
        const sentences = toCensor.map(p => separateParagraph(p));
        const censored = sentences.map(p => p.map(s => sentiment(s) <= -0.5 ? s : "<span class='censored'>" + s + "</span>"));
        toCensor.array.forEach((p, i) => {
            p.innerHTML = censored[i].join("");
        });
        document.body.appendChild(document.createElement("censored"));
    }
    if (document.getElementsByClassName("censor-style").length === 0)
        document.head.appendChild(censorStyle);
}

function decensor() {
    document.getElementsByClassName("censor-style").array.forEach(e => e.remove());
}

function getCensorable() {
    return document.getElementsByTagName("p");
}

function separateParagraph(p) {
    return p.split(/[,.]/);
}

function sentiment(s) {
    return Math.random() * 2 - 1;
}