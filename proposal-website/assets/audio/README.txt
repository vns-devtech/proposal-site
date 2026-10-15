ROMANTIC AUDIO ASSET GUIDE
===========================

By default, the website includes a built-in, 100% offline acoustic music-box synthesizer (Web Audio API) that plays a gentle romantic arpeggio chord progression without requiring any external MP3 download.

WANT TO USE YOUR OWN SONG?
---------------------------
If you and your partner have a special song (e.g. Ed Sheeran, Taylor Swift, Elvis, or an acoustic piano piece):
1. Place your MP3 file in this directory and name it:
   romantic-bgm.mp3
2. In js/script.js (or src/utils/soundSynthesizer.ts), set:
   useCustomAudio = true;
3. Refresh the website, click the music button in the top navigation, and your custom song will play!
