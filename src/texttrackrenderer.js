const TextTrackRenderer = () => {
  let div,
      track

  const attach = (element) => {
    if (element.tagName) div = element
    else console.log(`${div} is not an HTML div container`)
  }

  const addTextTrack = (obj) => {
    if (div == null) console.log(`attach div container using .attach() first`)
    if (obj == null) console.log(`please add track first`)
    else {
      track = obj
      if (isElement(track)) loadTrack(track, track.track)
      else loadTrack(document.querySelector('track'), track) // <-- This should be a more precise selector
    }
  }

  const loadTrack = (elem, obj) => {
    let trackElem = elem,
        trackObj  = obj
    if (trackElem.readyState == 2) renderCues(trackObj)
    else if (trackElem.addEventListener) trackElem.addEventListener('load', function() {loadTrack(trackElem, trackObj)}, false);
    else trackElem.attachEvent('onload', function() {loadTrack(trackElem, trackObj)})
  }

  const renderCues = (obj) => {
    let trackObj = obj
    if (typeof trackObj !== 'object') console.log(`The ${typeof trackObj} "${trackObj}" is not a valid track`)
    else for (let cue of trackObj.cues) div.innerHTML = div.innerHTML + `<span>${cue.text}</span>`
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
