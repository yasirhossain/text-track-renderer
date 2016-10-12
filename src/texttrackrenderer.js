export default class TextTrackRenderer {
  constructor = () => {}

  attach = (element) => {
    this.element = element;
    this.string = 'Hello World!';
    this.element.innerHTML= `<span>${this.string}</span>`;
    return this.element;
  }
}
