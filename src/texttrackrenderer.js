const TextTrackRenderer = () => {
  let divElement,
      trackElement

  const attach = (div) => {
    if (div.tagName) divElement = div
    else console.log(`${div} is not an HTML div container`)
  }

  const addTextTrack = (track) => {
    if (divElement == null) console.log(`attach div container using .attach() first`)
    if (track == null) console.log(`please add track first`)
    else {
      trackElement = track
      if (trackElement.tagName === 'TRACK') loadTrack()
      else console.log(`${track} is not an HTML track container`)
    }
  }

  const loadTrack = () => {
    if (trackElement.readyState == 2) for (let cue of trackElement.track.cues) renderCues(cue)
    else if (trackElement.addEventListener) trackElement.addEventListener('load', loadTrack, false);
    else trackElement.attachEvent('onload', loadTrack)
  }

  const renderCues = (cue) => {
    divElement.innerHTML = divElement.innerHTML + `<span>${cue.text}</span>`
    console.log(cue)
  }

  return {
    attach,
    addTextTrack
  }
}

module.exports = TextTrackRenderer
