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
  { title: "Labrinth - Mount Everest", src: "Labrinth - Mount Everest.mp3" },
  { title: "JayA Luuck - Nemo", src: "JayA Luuck - Nemo (Videoclipe Oficial).mp3" },
  { title: "Matuê - A Morte do Autotune 💔", src: "autotune.mp3" }
];

let currentTrackIndex = 0;

function loadTrack(index) {
  const track = playlist[index];
  audioPlayer.src = track.src;
  document.querySelector('.song-title').textContent = track.title;
  audioPlayer.load();
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  progressBar.value = (currentTime / duration) * 100;
  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
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
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.querySelector('img').src = 'botao-de-av.png';
  } else {
    audioPlayer.pause();
    playPauseButton.querySelector('img').src = 'toque.png';
  }
});

nextButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

prevButton.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
});

loadTrack(currentTrackIndex);
