const TextTrackRenderer = () => {
  let div,
      track,
      cueHeight, cueFontSize, cuePosition

  const attach = (element) => {
    if (element.tagName) {
      div = element
      div.style.position = 'relative'

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
          color:#fff;
          background-color:#000;
        }
        .ttrCues .ttrCue:after{display:block;content:"";background-color:transparent;}
        .ttrCues .ttrCue:last-child:after{content:initial;}
        .ttrCues .ttrCue.start, .ttrCues span.left {left:0;right:auto;}
        .ttrCues .ttrCue.right{left:auto;right:0;}
        .ttrCues .ttrCue.middle{position:relative;}
      </style>`,
      cueContainer = `<div class="ttrCues"></div>`

      div.innerHTML = cueStyleElem + cueContainer
    }
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
    track.oncuechange = () => renderCues()
  }

  const renderCues = () => {
    let cueHeight = div.offsetHeight / 15,
        cueFontSize = cueHeight * .8,
        cuePosition = 'position:relative;bottom:auto;',
        cueDefStyles = `height:${cueHeight}px;font-size:${cueFontSize}px;`

    div.childNodes[1].innerHTML = ''
    for (let cue of track.activeCues) {
      let cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />')

      if (typeof cue.line !== 'number' || cue.line == 0)
        cuePosition = 'bottom:0;top:auto;height:auto;'
      else
        if (cue.align == 'middle')
          cuePosition = `bottom:${(cueHeight * cue.line) - cueHeight}px;height:auto;`
        else
          cuePosition = `top:${(cueHeight * cue.line) - cueHeight}px;bottom:auto;height:auto;`

      console.log(`${cue.text}`)
      console.log(`cue.line - ${cue.line}`)
      console.log(`cue.align - ${cue.align}`)

      div.childNodes[1].innerHTML += `<span class="ttrCue ${cue.align}" style="${cueDefStyles}${cuePosition}">${cueText}</span>`
    }
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
