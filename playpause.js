// wait until window loads before making our changes
window.addEventListener('load', function () {
	// establish namespace and shortcut
	if (!window.WanderTheResort) {
		window.WanderTheResort = {};
	}
	let wtr = window.WanderTheResort;

	wtr.videoPlayer = document.querySelector('#hero-video video');
	wtr.button = document.querySelector('.play-pause-button');
	wtr.playImage = document.querySelector('.play-pause-button .play');
	wtr.pauseImage = document.querySelector('.play-pause-button .pause');
	wtr.videoPlaying = true;

	wtr.updatePlayingStatus = () => {
		wtr.videoPlaying = wtr.videoPlayer.currentTime > 0 && !wtr.videoPlayer.paused && !wtr.videoPlayer.ended && wtr.videoPlayer.readyState > 2;
	}

	wtr.togglePlayingStatus = () => {
		if (wtr.videoPlaying) {
			wtr.videoPlayer.pause();
		} else {
			wtr.videoPlayer.play();
		}
		wtr.updatePlayingStatus();
	}

	wtr.updateButton = () => {
		if (wtr.videoPlaying) {
			// show pause
			wtr.pauseImage.classList.remove('hidden');
			wtr.playImage.classList.add('hidden');
		} else {
			// show play
			wtr.playImage.classList.remove('hidden');
			wtr.pauseImage.classList.add('hidden');
		}
	}

	wtr.buttonClick = (e) => {
		wtr.updatePlayingStatus();
		wtr.togglePlayingStatus();
		wtr.updateButton();
	}

	if (wtr.videoPlayer) {
		wtr.videoPlayer.loop = true;
		wtr.button.addEventListener('click', e => wtr.buttonClick(e))
		// show button
		wtr.button.classList.remove('hidden');
		wtr.updatePlayingStatus();
		wtr.updateButton();
	} else {
		// remove button
		wtr.button.remove();
	}
}, false);