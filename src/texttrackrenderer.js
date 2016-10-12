export default class TextTrackRenderer {
  constructor = () => {}

  attach = (divElement) => {
    this.divElement = divElement;
    let string = 'Hello World!';
    this.divElement.innerHTML= `<span>${string}</span>`;
  }

  addTextTrack = (trackElement) => {
    this.trackElement = trackElement;
    this.trackElement.addEventListener('load', function() {
      const textTrack = this.track;
      for (let cue of textTrack.cues) {
        console.log(cue);
      }
    });
  }
}
