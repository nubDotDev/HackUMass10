let enabled = false;

const censorStyle = document.createElement("style");
censorStyle.classList.add("censor-style");
censorStyle.innerHTML = `
.censored {
    color: transparent;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}
`;

chrome.runtime.sendMessage({ title: "get-enabled" }, (res) => {
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
    // fetch("http://127.0.0.1:5000/sentiment-analysis").then(res => res.json()).then(console.log);
    if (document.getElementsByTagName("censored").length === 0) {
        const toCensor = getCensorable();
        const sentences = toCensor.map(p => separateParagraph(p.innerHTML));
        Promise.all(sentences.map(p => Promise.all(p.map(s => sentiment(s).then(res => res >= 0 ? s : "<span class='censored'>" + s + "</span>"))))).then(res => {
            toCensor.forEach((p, i) => {
                p.innerHTML = res[i].join(". ");
            });
            document.body.appendChild(document.createElement("censored"));
        });
    }
    if (document.getElementsByClassName("censor-style").length === 0)
        document.head.appendChild(censorStyle);
}

function decensor() {
    Array.from(document.getElementsByClassName("censor-style")).forEach(e => e.remove());
}

function getCensorable() {
    return Array.from(document.getElementsByTagName("p"));
}

function separateParagraph(p) {
    return p.split('. ');
}

function sentiment(s) {
    // return Math.random() * 2 - 1;
    return fetch("http://127.0.0.1:5000/sentiment-analysis", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({text: s})
    }).then(res => res.json()).then(res => (res[0].label === "POSITIVE" ? 1 : -1) * res[0].score);
}