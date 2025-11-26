// bio.js  - generic, loaded after the page supplies the data
const phrases = window.BIO_ARRAY || [''];
let sleepTime = 150, curPhraseIndex = 0;
const el = document.getElementById("bio");

const writeLoop = async () => {
  for (;;) {
    let e = phrases[curPhraseIndex];
    if (e.length === 0) continue; // Skip if the phrase is empty
    console.log(e);
    el.innerText = ''; // Clear the element before starting a new phrase

    // Type out the entire phrase
    for (let s = 0; s < e.length; s++) {
      el.innerText = e.substring(0, s + 1);
      await sleep(sleepTime);
    }

    // Wait before erasing
    await sleep(10 * sleepTime);

    // Erase the entire phrase
    for (let s = e.length; s > 0; s--) {
      el.innerText = e.substring(0, s - 1);
      await sleep(sleepTime);
    }

    // Wait before starting the next phrase
    await sleep(5 * sleepTime);
    curPhraseIndex = (curPhraseIndex + 1) % phrases.length;
  }
};

function sleep(e) {
  return new Promise((s) => setTimeout(s, e));
}

writeLoop();
