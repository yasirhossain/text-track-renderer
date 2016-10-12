export default class TextTrackRenderer {
  constructor() {}

  attach(track) {
    this.track = track;
    return "Hello World! " + this.track;
  }
}
