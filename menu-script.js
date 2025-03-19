const profileBtn = document.querySelector('.profile-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

profileBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');

const playlist = [
  { title: "24 songs - Ego", src: "24 songs - Ego.mp3" },
  { title: "Bando - carti", src: "Bando - carti.mp3" },
  { title: "Playboi Carti - Molly", src: "Playboi Carti - Molly.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.src;
  document.querySelector('.song-title').textContent = track.title;
  audioPlayer.load();
  audioPlayer.volume = 0.21;
  volumeBar.value = 21;
  currentTimeDisplay.textContent = formatTime(0);
  durationDisplay.textContent = formatTime(audioPlayer.duration);
  if (isPlaying) {
    audioPlayer.play();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  if (!isNaN(duration)) {
    progressBar.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
  }
});

progressBar.addEventListener('input', () => {
  const duration = audioPlayer.duration;
  const value = progressBar.value;
  audioPlayer.currentTime = (value / 100) * duration;
});

volumeBar.addEventListener('input', () => {
  audioPlayer.volume = volumeBar.value / 100;
});

playPauseButton.addEventListener('click', () => {
  if (audioPlayer.paused || audioPlayer.ended) {
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.querySelector('img').src = 'botao-de-av.png';
  } else {
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.querySelector('img').src = 'toque.png';
  }
});

nextButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
});

prevButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
});

loadTrack(currentTrackIndex);
