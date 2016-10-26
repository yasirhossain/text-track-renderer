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

  const setTextTrack = (obj) => {
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
    track.oncuechange = () => renderCues()
  }

  const renderCues = () => {
    let cueContainer   = `<div class="ttrCues" style="position:absolute;left:0;bottom:0;width:100%;"></div>`,
        cueStyle       = `height:${cueHeight}px;width:100%;text-align:center;position:relative;font-size:${cueFontSize}px;color:#fff;background-color:#000;padding:2px 5px;`,
        cueStyleElem   = `<style>.ttrCues span:after{display:block;content:"";background-color:transparent;} .ttrCues span:last-child:after{content:initial;}</style>`

    div.innerHTML = cueStyleElem + cueContainer
    console.log(track.activeCues)
    for (let cue of track.activeCues)
      div.childNodes[1].innerHTML += `<span style="${cueStyle}">${cue.text}</span>`
  }

  const isElement = (obj) => {
    return
      typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==='string'
  }

  return {
    attach,
    setTextTrack
  }
}

module.exports = TextTrackRenderer
