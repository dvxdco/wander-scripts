window.addEventListener('load', function () {
	let videoPlayer = document.querySelector('#hero-video video');
	let button = document.querySelector('.play-pause-button');
	let playImage = document.querySelector('.play-pause-button .play');
	let pauseImage = document.querySelector('.play-pause-button .pause');
	let videoPlaying = true;

	const updatePlayingStatus = () => {
		videoPlaying = videoPlayer.currentTime > 0 && !videoPlayer.paused && !videoPlayer.ended && videoPlayer.readyState > 2;
	}

	const togglePlayingStatus = () => {
		if (videoPlaying) {
			videoPlayer.pause();
		} else {
			videoPlayer.play();
		}
		updatePlayingStatus();
	}

	const updateButton = () => {
		if (videoPlaying) {
			// show pause
			pauseImage.classList.remove('hidden');
			playImage.classList.add('hidden');
		} else {
			// show play
			playImage.classList.remove('hidden');
			pauseImage.classList.add('hidden');
		}
	}

	const buttonClick = (e) => {
		updatePlayingStatus();
		togglePlayingStatus();
		updateButton();
	}

	if (videoPlayer) {
		videoPlayer.loop = true;
		button.addEventListener('click', e => buttonClick(e))
		// show button
		button.classList.remove('hidden');
		updatePlayingStatus();
		updateButton();
	} else {
		// remove button
		button.remove();
	}
}, false);