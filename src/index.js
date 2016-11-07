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

const incSize = () => {
  video.style.height = video.offsetHeight + (20 * .5625)
  video.style.width = video.offsetWidth + 20

  d.style.height = video.offsetHeight + (20 * .5625)
  d.style.width = video.offsetWidth + 20

  document.getElementById('btn-normal').style.display = 'inline'
}

const decSize = () => {
  video.style.height = video.offsetHeight - (20 * .5625)
  video.style.width = video.offsetWidth - 20

  d.style.height = video.offsetHeight - (20 * .5625)
  d.style.width = video.offsetWidth - 20

  document.getElementById('btn-normal').style.display = 'inline'
}

const resize = () => {
  ttr.layout()
}

const normSize = () => {
  video.style.height = 640 * .5625
  video.style.width = 640

  d.style.height = 640 * .5625
  d.style.width = 640

  document.getElementById('btn-normal').style.display = 'none'
}

document.getElementById('btn-default').addEventListener('click', defaultLoader)
document.getElementById('btn-hls').addEventListener('click', hlsLoader)

document.getElementById('btn-normal').addEventListener('click', normSize)
document.getElementById('btn-larger').addEventListener('click', incSize)
document.getElementById('btn-smaller').addEventListener('click', decSize)
document.getElementById('btn-resize').addEventListener('click', resize)

ttr.setTextTrack(vt)
//ttr.setTextTrack(t)
