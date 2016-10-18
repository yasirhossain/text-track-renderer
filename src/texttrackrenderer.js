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
      if (isElement(obj)) loadTrack(obj.track)
      else if (typeof obj == 'object') loadTrack(obj)
      else console.log(`the ${typeof obj} ${obj} is not a valid track object`)
    }
  }

  const loadTrack = (obj) => {
    track = obj
    track.oncuechange = () => { renderCues() }
  }

  const renderCues = () => {
    div.innerHTML = ''
    console.log(track.activeCues)
    for (let cue of track.activeCues) div.innerHTML = div.innerHTML + `<span>${cue.text}</span>`
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
