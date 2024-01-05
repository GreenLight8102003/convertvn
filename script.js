let input_text = document.getElementById("input-text");
let btn_stt = document.getElementById("btn-stt");
let btn_tts = document.getElementById("btn-tts");
let change = document.getElementById("change");
window.SpeechRecognition = window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = window.navigator.language;
recognition.interimResults = true;
let isSpeaking = true;

change.onclick = () => {
    if (change.innerText == "Speech to text") {
        btn_stt.classList.remove("hide");
        btn_tts.classList.add("hide");
        change.innerText="Text to speech"
    }
    else {
        btn_stt.classList.add("hide");
        btn_tts.classList.remove("hide");
        change.innerText = "Speech to text";
    }
}

btn_tts.onclick = () => {
    let synth = window.speechSynthesis;
    let text = input_text.value;

    if (!synth.speaking && text) {
        let utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    if (text.length > 50) {
        if (synth.speaking && isSpeaking) {
            btn_tts.innerText = "Pause";
            synth.resume();
            isSpeaking = false;
        }
        else {
            btn_tts.innerText = "Resume";
            synth.pause();
            isSpeaking = true;
        }
    }
    else {
        isSpeaking = false;
        btn_tts.innerText = "Speaking";
    }

    setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
            isSpeaking = true;
            btn_tts.innerText = "Text to speech";
        }
    })
}

btn_stt.onclick = () => {
    if (!isSpeaking == false) {
        recognition.start();
        btn_stt.innerText = "Stop";
        isSpeaking = false;
    }
    else {
        recognition.stop();
        btn_stt.innerText = "Speech to text";
        isSpeaking = true;
    }
}

recognition.addEventListener('result', (e) => {
    let result = e.results[e.results.length - 1][0].transcript;
    input_text.textContent = result;
})