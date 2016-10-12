import TextTrackRenderer from './texttrackrenderer';

// Instantiates TextTrackRenderer
const ttr = new TextTrackRenderer();
console.log(ttr);

// User chooses div to pass to attach handler
let d = document.getElementById('TextTrackRenderer');
console.log('Calling Attach Method... ' + ttr.attach(d));

// Below for notes only
/*
// With PDK Dependency
$pdk.controller.addEventListener('OnTextTracksAvailable', function(e){
  console.log(':::::::::::OnTextTracksAvailable:::::::::::');
  var num =e.data.entries.length;
  console.log(e);
});
*/

/*
// Proof of Concept Code
let v = document.querySelector('video');

const initTextTracks = () => {
  let track = document.createElement('track');

  track.src = '../video/developerStories-subtitles-en.vtt';
  track.label = 'English subtitles';
  track.kind = 'subtitles';
  track.srclang = 'en';
  track.mode = 'showing';
  track.setAttribute('default', '');
  v.appendChild(track);
  v.setAttribute('crossOrigin', 'anonymous');
};

// IE11, Firefox, Chrome, Safari, iOS10, Android
document.addEventListener('DOMContentLoaded', function() {
  initTextTracks();

  let textTracks = v.textTracks;
  let textTrackContainer = document.createElement('div');
  textTrackContainer.setAttribute('id', 'tpTextTrackRender');
  document.getElementsByTagName('div')[0].appendChild(textTrackContainer);

  let cueRenderer = () => {
    const cue = v.textTracks[0].activeCues[0];
    if (cue !== undefined) {
      console.log(cue);
      console.log(cue.text);
      textTrackContainer.innerHTML = '<p>' + cue.text + '</p>';
    }
  };

  if (textTracks.length > 0) {
    textTracks[0].oncuechange = () => { cueRenderer(); };
  } else {
    // some browsers don't support track.oncuechange
    v.addEventListener('timeupdate', () => { cueRenderer(); });
  }
});
*/
