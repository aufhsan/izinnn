const textInput = document.getElementById("textInput");
const counter = document.getElementById("counter");

function adjustHeight() {
    textInput.style.height = "auto";
    textInput.style.height = Math.min(textInput.scrollHeight, 460) + "px";
}

function countWords(text) {
    let words = 0;
    let inWord = false;

    for (let char of text) {
        if (char !== " " && !inWord) {
            words++;
            inWord = true;
        }
        if (char === " ") inWord = false;
    }

    return words;
}

function countSentences(text, i = 0) {
    if (i >= text.length) return 0;
    return ".!?".includes(text[i])
        ? 1 + countSentences(text, i + 1)
        : countSentences(text, i + 1);
}

function updateCounter() {
    const text = textInput.value.trim();

    counter.innerHTML = text
        ? `${text.length} Char &nbsp; 
           ${countWords(text)} Word &nbsp; 
           ${countSentences(text)} Sentence`
        : "0 Char &nbsp; 0 Word &nbsp; 0 Sentence";
}

textInput.addEventListener("input", () => {
    adjustHeight();
    updateCounter();
});

window.addEventListener("resize", adjustHeight);

function transformText(type) {
    const actions = {
        upper: text => text.toUpperCase(),
        lower: text => text.toLowerCase(),
        capitalized: text =>
            text.toLowerCase().split(" ")
                .map(w => w[0]?.toUpperCase() + w.slice(1))
                .join(" "),
        sentence: text =>
            text.toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
    };

    if (!textInput.value) return;

    textInput.value = actions[type](textInput.value);
    adjustHeight();
    updateCounter();
}

function clearText() {
    textInput.value = "";
    updateCounter();
    adjustHeight();
}

function copyText() {
    if (textInput.value)
        navigator.clipboard.writeText(textInput.value);
}
