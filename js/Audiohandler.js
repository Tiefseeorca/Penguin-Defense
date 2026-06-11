// Author: Timo Lauterbach
// Rework: Philipp
class Audiohandler {
	static MAX_SOUND_EFFECTS = 15;
	static pool = [];

	//initialize audio nodes
	static init(){
		for (let i=0; i < Audiohandler.MAX_SOUND_EFFECTS; i++){
			let audioNode = document.createElement("audio");
			Audiohandler.pool.push(audioNode);
		}
	}

	// play sounds
	static play(audioInput, volume = 1.0){
		const MAX_VOLUME_LIMIT = 0.5;
		let src = (audioInput && typeof audioInput === 'object') ? audioInput.src : audioInput;
		//let src = audioInput.src;

		//DEBUG
		if (!src) {
			console.warn("Invalid audio-path: ", audioInput);
			return;
		}

		let availableAudio = Audiohandler.pool.find(audio => audio.paused || audio.ended);

		if (!availableAudio){
			availableAudio = Audiohandler.pool[0];
			availableAudio.pause();
		}

		if (availableAudio.src != src){
			availableAudio.src = src;
		}

		let finalVolume = volume * MAX_VOLUME_LIMIT;
		availableAudio.volume = Math.min(finalVolume, MAX_VOLUME_LIMIT);

		availableAudio.currentTime = 0;

		availableAudio.play().catch(e=> {});
	}
}