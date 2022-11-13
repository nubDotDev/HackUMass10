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
    if (document.getElementsByTagName("censored").length === 0) {
        const toCensor = getCensorable();
        const sentences = toCensor.map(p => separateParagraph(p.innerHTML));

        // Whole document
        paragraphsSentiment(sentences).then(res => {
            toCensor.forEach((p, i) => {
                p.innerHTML = res[i].map((x, j) => x >= 0 ? sentences[i][j] : "<span class='censored'>" + sentences[i][j] + "</span>").join("");
            });
            document.body.appendChild(document.createElement("censored"));
        });

        // Per paragraph
        // Promise.all(sentences.map(p => paragraphSentiment(p).then(res => res.map((x, i) => x >= 0 ? p[i] : "<span class='censored'>" + p[i] + "</span>")))).then(res => {
        //     toCensor.forEach((p, i) => {
        //         p.innerHTML = res[i].join("");
        //     });
        //     document.body.appendChild(document.createElement("censored"));
        // });

        // Per sentence
        // Promise.all(sentences.map(p => Promise.all(p.map(s => sentiment(s).then(res => res >= 0 ? s : "<span class='censored'>" + s + "</span>"))))).then(res => {
        //     toCensor.forEach((p, i) => {
        //         p.innerHTML = res[i].join("");
        //     });
        //     document.body.appendChild(document.createElement("censored"));
        // });
    }
    if (document.getElementsByClassName("censor-style").length === 0)
        document.head.appendChild(censorStyle);
}

function decensor() {
    Array.from(document.getElementsByClassName("censor-style")).forEach(e => e.remove());
}

function getCensorable() {
    return [...Array.from(document.getElementsByTagName("p")), ...Array.from(document.getElementsByTagName("blockquote"))];
}

function separateParagraph(p) {
    const res = [];
    let start = 0;
    for (let i = 0; i < p.length - 1; ++i) {
        if (p[i] === ".") {
            let j = i + 1;
            for (; j < p.length - 1 && [" ", "\n", "."].includes(p[j]); ++j);
            if (j - i > 1) {
                res.push(p.substring(start, j));
                i = j - 1;
                start = j;
            }
        }
    }
    res.push(p.substring(start, p.length));
    return res;
}

function textSentiment(s) {
    return fetch("http://127.0.0.1:5000/sentiment-analysis", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({text: s})
    }).then(res => res.json()).then(res => (res[0].label === "POSITIVE" ? 1 : -1) * res[0].score);
}

function paragraphSentiment(p) {
    return fetch("http://127.0.0.1:5000/sentiment-analysis", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({paragraph: p})
    }).then(res => res.json()).then(res => res.map(x => (x.label === "POSITIVE" ? 1 : -1) * x.score));
}

function paragraphsSentiment(ps) {
    return fetch("http://127.0.0.1:5000/sentiment-analysis", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({paragraphs: ps})
    }).then(res => res.json()).then(res => res.map(p => p.map(x => (x.label === "POSITIVE" ? 1 : -1) * x.score)));
}