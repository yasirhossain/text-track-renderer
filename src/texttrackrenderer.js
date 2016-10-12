export default class TextTrackRenderer {
  constructor = () => {}

  attach = (element) => {
    this.element = element;
    let string = 'Hello World!';
    this.element.innerHTML= `<span>${string}</span>`;
  }

  addTextTrack = (trackElement) => {
    this.trackElement = trackElement;
    this.trackElement.addEventListener("load", function() {
      const textTrack = this.track;
      for (let cue of textTrack.cues) {
        console.log(cue);
      }
    });
  }
}
