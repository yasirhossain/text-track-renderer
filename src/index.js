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
const ttr = new TextTrackRenderer()
ttr.attach(d)

const defaultLoader = () => {
    video.removeAttribute('src')
    video.pause()
    video.load()
    video.play()
    video.innerHTML = ''
    for (let source of videoSample.videos)
      video.innerHTML += `<source src="${source.src}" type="${source.type}"></source>`
    for (let track of videoSample.tracks)
      video.innerHTML += `<track src="${track.src}" label="${track.label}" kind="${track.kind}" srclang="${track.srclang}" default></track>`
    setTimeout(function() {
      ttr.setTextTrack(document.querySelector('video').textTracks[0])
    }, 1000)
}

const hlsLoader = () => {
  if(Hls.isSupported()) {
    let hls = new Hls()
    video.innerHTML = ''
    hls.loadSource('http://cdn3.videos.bloomberg.com/btv/us/master.m3u8')
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED,function(event, data) {
      video.play()
      console.log(data)
      setTimeout(function() {
        ttr.setTextTrack(document.querySelector("video").textTracks[0]);
      }, 5000)
    })
  }
}

document.getElementById('btn-default').addEventListener('click', defaultLoader)
document.getElementById('btn-hls').addEventListener('click', hlsLoader)

//ttr.setTextTrack(vt)
//ttr.setTextTrack(t)
