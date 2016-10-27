const TextTrackRenderer = () => {
  let div,
      track,
      cueHeight, cueFontSize

  const attach = (element) => {
    if (element.tagName) {
      let cueStyleElem =
      `<style>
        .ttrCues {
          position:absolute;
          left:0;bottom:0;
          width:100%;
        }
        .ttrCues .ttrCue {
          text-align:center;
          position:relative;
          color:#fff;
          background-color:#000;
          clear:both;
        }
        .ttrCues .ttrCue:after{display:block;content:"";background-color:transparent;}
        .ttrCues .ttrCue:last-child:after{content:initial;}
        .ttrCues .ttrCue.start, .ttrCues span.left {float:left;}
        .ttrCues .ttrCue.right{float:right;}
      </style>`,
      cueContainer = `<div class="ttrCues"></div>`

      div = element
      div.style.position = 'relative'
      div.innerHTML = cueStyleElem + cueContainer
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
    let cueContainer   = `<div class="ttrCues"></div>`,
        cueDefStyles   = `height:${cueHeight}px;font-size:${cueFontSize}px;`

    console.log(track.activeCues)
    div.childNodes[1].innerHTML = ''
    for (let cue of track.activeCues) {
      let cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />')
      div.childNodes[1].innerHTML += `<span class="ttrCue ${cue.align}" style="${cueDefStyles}">${cueText}</span>`
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
