const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const playBtnIcon = playBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const muteBtnIcon = muteBtn.querySelector('i');
const volumeRange = document.getElementById('volume');
const currenTime = document.getElementById('currenTime');
const totalTime = document.getElementById('totalTime');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const fullScreenIcon = fullScreenBtn.querySelector('i');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById('videoControls');

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = e => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
};

const handleMute = e => {
  if (video.muted) {
    video.muted = false;
    video.volume = 0.5;
  } else {
    video.muted = true;
    video.volume = 0;
  }
  muteBtnIcon.classList = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  volumeRange.value = video.muted ? 0 : 0.5;
};

const handleVolumeChange = event => {
  const {
    target: {value},
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }

  volumeValue = Number(value);
  video.volume = value;

  if (volumeValue === 0) {
    video.muted = true;
    muteBtn.innerText = 'Unmute';
  }
};

const formatTime = seconds => {
  if (seconds >= 3600 * 1000) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  } else {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
  }
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handleTimelineChange = event => {
  const {
    target: {value},
  } = event;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

window.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    handlePlayClick();
  }
});

const handleFullScreen = event => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const handleFullScreenBtn = event => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    fullScreenIcon.classList = 'fas fa-expand';
  } else {
    fullScreenIcon.classList = 'fas fa-compress';
  }
};

const hideControls = () => videoControls.classList.remove('showing');

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  //cancel old time out
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  //set new time out
  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadeddata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
timeline.addEventListener('input', handleTimelineChange);
timeline.addEventListener('change', handleTimelineSet);
fullScreenBtn.addEventListener('click', handleFullScreen);
videoContainer.addEventListener('fullscreenchange', handleFullScreenBtn);
if (video.readyState === 4) {
  handleLoadedMetadata();
}
