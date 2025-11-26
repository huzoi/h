const button = document.getElementById("musicbtn")
  , icon = document.getElementById("volumebtn")
  , blur = document.getElementById("blurthepage")
  , audio = document.getElementById("audioatp");
function sleep(e) {
    return new Promise((t => setTimeout(t, e)))
}
async function change() {
    await new Promise((e => setTimeout(e, 500))),
    blur.classList.add("blurpagerplc2")
}
button.addEventListener("click", ( () => {
    audio.paused ? (audio.volume = .04,
    audio.play(),
    icon.classList.remove("fa-volume-up"),
    icon.classList.add("fa-volume-mute")) : (audio.pause(),
    icon.classList.remove("fa-volume-mute"),
    icon.classList.add("fa-volume-up")),
    button.classList.add("replace"),
    blur.classList.add("blurpagerplc"),
    change()
}
));
