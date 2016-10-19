const TextTrackRenderer = () => {
  let div,
      track,
      cueHeight, cueFontSize

  const attach = (element) => {
    if (element.tagName) {
      div = element
      div.style.position = 'relative'
      cueHeight = div.offsetHeight / 15
      cueFontSize = cueHeight * .8
    }
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
    let cueContainer = `<div class="ttrCues" style="position:absolute;left:50%;top:auto;bottom:0;"></div>`,
        cueStyle     = `color:#fff;text-align:center;background-color:#000;display:block;position:relative;left:-50%;
                        height:${cueHeight}px;
                        font-size:${cueFontSize}px;`
    div.innerHTML = cueContainer
    for (let cue of track.activeCues) {
      div.childNodes[0].innerHTML += `<span style="${cueStyle}">${cue.text}</span>`
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
