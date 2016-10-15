const TextTrackRenderer = () => {
  let divElement,
      trackElement

  function attach(div) {
    if (div.tagName) divElement = div
    else console.log(`${div} is not an HTML div container`)
  }

  function addTextTrack(track) {
    if (divElement == null) console.log(`attach div container using .attach() first`)
    if (track == null) console.log(`please add track first`)
    else {
      trackElement = track
      if (trackElement.tagName === 'TRACK') loadTrack()
      else console.log(`${track} is not an HTML track container`)
    }
  }

  function loadTrack() {
    if (trackElement.readyState == 2) loopTrack()
    else if (trackElement.addEventListener) trackElement.addEventListener('load', loadTrack, false);
    else trackElement.attachEvent('onload', loadTrack)
  }

  function loopTrack() {
    for (let cue of trackElement.track.cues) {
      layoutManager(cue)
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

module.exports = TextTrackRenderer
