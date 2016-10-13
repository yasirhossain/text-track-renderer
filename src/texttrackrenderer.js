export default function() {
  let divElement,
      trackElement

  function attach(div) {
    if (div.tagName) divElement = div
    else console.log(`${div} is not an HTML div container`)
  }

  function addTextTrack(track) {
    if (divElement == null) console.log(`attach div container using .attach() first`)
    else {
      console.log(track);
      if (track.tagName) {
        trackElement = track
        trackElement.addEventListener('load', function() {
          let textTrack = this.track
          for (let cue of textTrack.cues) {
            layoutManager(cue)
          }
        })
      }
      else console.log(`${track} is not an HTML track container`)
    }
  }

  function layoutManager(cue) {
    divElement.innerHTML = divElement.innerHTML + `<span>${cue.text}</span>`
    console.log(cue)
  }

  return {
    attach,
    addTextTrack
  }
}
