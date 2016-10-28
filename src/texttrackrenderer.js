const TextTrackRenderer = () => {
  let div,
      track

  const attach = (element) => {
    if (element.tagName)
      div = element
    else
      console.log(`${div} is not an HTML div container`)
  }

  const setTextTrack = (obj) => {
    if (div == null)
      console.log(`attach div container using .attach() first`)
    if (obj == null) {
      div.innerHTML = ''
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
    track.oncuechange = () => renderCues()
  }

  const renderCues = () => {
    let cueHeight = div.offsetHeight / 15,
        cueFontSize = cueHeight * .8,
        cueDefStyles = `height:${cueHeight}px;font-size:${cueFontSize}px;`,
        cuePosition

    div.childNodes[1].innerHTML = ''
    for (let cue of track.activeCues) {
      let cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (typeof cue.line == 'number' && cue.line !== 0)
        if (cue.align == 'middle')
          cuePosition = `top:${(cueHeight * cue.line) - cueHeight}px;`
        else
          cuePosition = `top:${(cueHeight * cue.line) - cueHeight}px;`

      div.childNodes[1].innerHTML += `<span class="ttrCue ${cue.align}" style="${cueDefStyles}${cuePosition}">${cueText}</span>`
    }
  }

  const isElement = (obj) => {
    return
      typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==='string'
  }

  const renderStyles = () => {
    let cueStyleElem =
    `<style>
      .ttrCues {
        height:${div.offsetHeight}px;
        width:${div.offsetWidth}px;
        display:table-cell;
        vertical-align:bottom;
        font-family: Helvetica, sans;
      }
      .ttrCues .ttrCue {
        text-align:center;
        position:absolute;
        bottom:0;
        color:#fff;
        background-color:#000;
      }
      .ttrCues .ttrCue:after{display:block;content:"";background-color:transparent;}
      .ttrCues .ttrCue:last-child:after{content:initial;}
      .ttrCues .ttrCue.start, .ttrCues span.left {left:0;right:auto;}
      .ttrCues .ttrCue.right{left:auto;right:0;}
      .ttrCues .ttrCue.middle{left:50%;transform:translateX(-50%);}
    </style>`,
    cueContainer = `<div class="ttrCues"></div>`

    div.style.position = 'relative'
    div.innerHTML = cueStyleElem + cueContainer
  }

  return {
    attach,
    setTextTrack
  }
}

module.exports = TextTrackRenderer
