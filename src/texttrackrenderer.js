const TextTrackRenderer = () => {
  let div,
      track,
      scale = 1

  const attach = (element) => {
    if (element.tagName) {
      div = element
    }
    else
      console.log(`${div} is not an HTML div container`)
  }

  const setTextTrack = (obj) => {
    if (track)
      resetTrack()
    if (div == null)
      console.log(`attach div container using .attach() first`)
    if (obj == null) {
      resetTrack()
      console.log(`please add track first`)
    }
    else {
      if (isElement(obj))
        loadTrack(obj.track)
      else if (typeof obj == 'object')
        loadTrack(obj)
      else
        console.log(`the ${typeof obj} ${obj} is not a valid track object`)
    }
  }

  const loadTrack = (obj) => {
    track = obj
    renderStyles()
    track.addEventListener('cuechange', renderTextTrack)
  }

  const renderTextTrack = () => {
    let cueHeight = (div.offsetHeight / 15) * scale,
        cueFontSize = cueHeight * .8,
        cueDefStyles = `height:${cueHeight}px;font-size:${cueFontSize}px;`,
        cuePosition,
        cueParentCont = div.childNodes[1]

    cueParentCont.innerHTML = ''
    cueParentCont.innerHTML = `<div class="ttr-line"></div><div class="ttr-container"></div>`

    let cueDefCont = cueParentCont.childNodes[0],
        cueLineCont = cueParentCont.childNodes[1]

    for (let i=0;i<track.activeCues.length;i++) {
      let cue = track.activeCues[i],
          cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
          cueSpan = `<span class="ttr-cue ttr-${cue.align}" style="${cueDefStyles}">${cueText}</span>`

      if (typeof cue.line !== 'number' || cue.line == -1)
        cueParentCont.childNodes[1].innerHTML += cueSpan
      else {
        let cuePosition = `top:${(cueHeight * cue.line) - cueHeight}px;`,
            cueSpan = `<span class="ttr-cue ttr-${cue.align}" style="${cueDefStyles}${cuePosition}">${cueText}</span>`
        if (cue.align == 'middle')
          cueParentCont.innerHTML += `<div class="ttr-centered">${cueSpan}</div>`
        else
          cueParentCont.childNodes[0].innerHTML += cueSpan
      }
    }
  }

  const resetTrack = () => {
    div.innerHTML = ''
    track.removeEventListener('cuechange', renderTextTrack)
  }

  const layout = () => {
    renderTextTrack()
  }

  const setScale = (num) => {
    if (num > 0) {
      if (num > 2)
        num = 2
      scale = num
      renderTextTrack()
    } else
      console.log(`scale of ${int} needs to be larger than 0`)
  }

  const isElement = (obj) => {
    return
      typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==='string'
  }

  const renderStyles = () => {
    let cueStyleElem =
    `<style>
      .ttr-cues {
        width:100%;
        height:100%;
        position:absolute;
        overflow:hidden;
      }
      .ttr-cues .ttr-container {
        position:absolute;
        z-index:15;
        bottom:0;
        width:100%;
      }
      .ttr-cues .ttr-line, .ttr-cues .ttr-centered {
        position:absolute;
        height:100%;
        width:100%;
        top:0;
        white-space: nowrap;
      }
      .ttr-cues .ttr-cue {
        text-align:center;
        position:absolute;
        overflow:hidden;
      }
      .ttr-cues .ttr-cue:last-child:after{content:initial;}
      .ttr-cues .ttr-cue.ttr-start, .ttr-cues span.ttr-left {left:0;right:auto;text-align:left;}
      .ttr-cues .ttr-cue.ttr-right{left:auto;right:0;text-align:right;}

      .ttr-cues .ttr-container .ttr-cue,
      .ttr-cues .ttr-centered .ttr-cue {position:relative;}

      .ttr-cues .ttr-container .ttr-cue.ttr-start,
      .ttr-cues .ttr-container .ttr-cue.ttr-left {float:left;}
      .ttr-cues .ttr-container .ttr-cue.ttr-right {float:right;}
    </style>`,
    cueContainer = `<div class="ttr-cues"></div>`

    div.style.position = 'relative'
    div.innerHTML = cueStyleElem + cueContainer
  }

  return {
    attach,
    layout,
    setScale,
    setTextTrack
  }
}

module.exports = TextTrackRenderer
