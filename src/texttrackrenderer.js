const TextTrackRenderer = () => {
  let divElement

  const attach = (div) => {
    if (div.tagName) divElement = div
    else console.log(`${div} is not an HTML div container`)
  }

  const addTextTrack = (track) => {
    if (divElement == null) console.log(`attach div container using .attach() first`)
    if (track == null) console.log(`please add track first`)
    else loadTrack(track)
  }

  const loadTrack = (track) => {
    let trackObj = track
    if (!isElement(trackObj) && typeof trackObj == 'object') renderCues(trackObj)
    else if (trackObj.readyState == 2) renderCues(trackObj.track)
    else console.log(`The ${typeof trackObj} "${trackObj}" is not a valid track`)
  }

  const renderCues = (obj) => {
    let trackObj = obj
    for (let cue of trackObj.cues) {
      divElement.innerHTML = divElement.innerHTML + `<span>${cue.text}</span>`
      console.log(cue)
    }
  }

  const isElement = (obj) => {
    return (
      typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==='string'
    )
  }

  return {
    attach,
    addTextTrack
  }
}

module.exports = TextTrackRenderer
