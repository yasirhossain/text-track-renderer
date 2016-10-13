export default function() {
  let divElement;
  let trackElement;

  function attach(div) {
    divElement = div;
    // layoutManager({text: 'Hello World!'});
  }

  function addTextTrack(track) {
    trackElement = track;
    trackElement.addEventListener('load', function() {
      const textTrack = this.track;
      for (let cue of textTrack.cues) {
        layoutManager(cue);
      }
    });
  }

  function layoutManager(cue) {
    divElement.innerHTML = divElement.innerHTML + `<span>${cue.text}</span>`;
    console.log(cue);
  }

  return {
    attach,
    addTextTrack
  }
}
