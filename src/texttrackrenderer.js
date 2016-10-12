export default class TextTrackRenderer {
  constructor = () => {}

  attach = (element) => {
    this.element = element;
    let string = 'Hello World!';
    this.element.innerHTML= `<span>${string}</span>`;
    return this.element;
  }
}
