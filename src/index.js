import TextTrackRenderer from './texttrackrenderer'

let video = document.querySelector('video'),
    videoSample = {
      videos: [
        {
          src: 'http://pmd205470tn.download.theplatform.com.edgesuite.net/Jeremy_LaCivita_(VMS)/654/339/developerStories-en.mp4',
          type: `video/webm; codecs='vp8, vorbis'`
        },
        {
          src: 'http://pmd205470tn.download.theplatform.com.edgesuite.net/Jeremy_LaCivita_(VMS)/654/339/developerStories-en.webm',
          type: `video/mp4;`
        },
      ],
      tracks: [
        {
          src: '/dist/public/video/subs-en.vtt',
          label: 'English subtitles',
          kind: 'subtitles',
          srclang: 'en'
        }
      ]
    },
    d = document.getElementById('trackRenderer'),
    t = document.querySelector('track'),
    vt = document.querySelector('video').textTracks[0]

// Instantiates TextTrackRenderer
video.addEventListener('loadedmetadata', function(e){
  d.style.height = video.videoHeight
  d.style.width = video.videoWidth
})

const ttr = new TextTrackRenderer()
ttr.attach(d)

const defaultLoader = () => {
    video.removeAttribute('src')
    video.load()
    ttr.setTextTrack(null)
    video.innerHTML = ''
    for (let source of videoSample.videos)
      video.innerHTML += `<source src="${source.src}" type="${source.type}"></source>`
    for (let track of videoSample.tracks)
      video.innerHTML += `<track src="${track.src}" label="${track.label}" kind="${track.kind}" srclang="${track.srclang}" default></track>`
    setTimeout(function() {
      ttr.setTextTrack(document.querySelector('video').textTracks[0])
    }, 1000)
    video.play()
}

const hlsLoader = () => {
  if(Hls.isSupported()) {
    let hls = new Hls()
    ttr.setTextTrack(null)
    video.innerHTML = ''
    hls.loadSource('http://cdn3.videos.bloomberg.com/btv/us/master.m3u8')
    hls.attachMedia(video)
    hls.on(Hls.Events.FRAG_LOADED, function() {
      video.play()
      setTimeout(function() {
        ttr.setTextTrack(document.querySelector("video").textTracks[0])
      }, 500)
    })
  }
}

// Div
const incSizeDiv = () => {
  video.style.height = video.offsetHeight + (20 * .5625)
  video.style.width = video.offsetWidth + 20

  d.style.height = video.offsetHeight + (20 * .5625)
  d.style.width = video.offsetWidth + 20

  document.getElementById('btn-normal').style.display = 'inline'
}

const decSizeDiv = () => {
  video.style.height = video.offsetHeight - (20 * .5625)
  video.style.width = video.offsetWidth - 20

  d.style.height = video.offsetHeight - (20 * .5625)
  d.style.width = video.offsetWidth - 20

  document.getElementById('btn-normal').style.display = 'inline'
}

const normSizeDiv = () => {
  video.style.height = 640 * .5625
  video.style.width = 640

  d.style.height = 640 * .5625
  d.style.width = 640

  document.getElementById('btn-normal').style.display = 'none'
}

// Font
const incSizeFont = () => {
  ttr.setScale(2)
  console.log('increase font')
  document.getElementById('btn-normal-font').style.display = 'inline'
}

const decSizeFont = () => {
  ttr.setScale(0.1)
  console.log('decrease font')
  document.getElementById('btn-normal-font').style.display = 'inline'
}

const normSizeFont = () => {
  ttr.setScale(1)
  console.log('reset font')
  document.getElementById('btn-normal-font').style.display = 'none'
}

const resize = () => {
  ttr.layout()
}

document.getElementById('btn-default').addEventListener('click', defaultLoader)
document.getElementById('btn-hls').addEventListener('click', hlsLoader)

document.getElementById('btn-normal-div').addEventListener('click', normSizeDiv)
document.getElementById('btn-larger-div').addEventListener('click', incSizeDiv)
document.getElementById('btn-smaller-div').addEventListener('click', decSizeDiv)
document.getElementById('btn-resize').addEventListener('click', resize)

document.getElementById('btn-normal-font').addEventListener('click', normSizeFont)
document.getElementById('btn-larger-font').addEventListener('click', incSizeFont)
document.getElementById('btn-smaller-font').addEventListener('click', decSizeFont)

ttr.setTextTrack(vt)
//ttr.setTextTrack(t)
