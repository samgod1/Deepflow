import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import Timer from "./components/Timer";

function App() {
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);
	const [isPlayingCompletedSound, setIsPlayingCompletedSound] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isMuted, setIsMuted] = useState(false);

	const musicRef = useRef(null);
	const ambientSoundRef = useRef(null);

	function resetMusic() {
		musicRef.current.pause();
		musicRef.current.currentTime = 0;
		setIsMusicPlaying(false);
	}

	function playAmbientSound(e) {
		const { name } = e.currentTarget;

		const sounds = {
			rain: "/music/rain.mp3",
			firecamp: "/music/firecamp.mp3",
			forest: "/music/forest.mp3",
			cafe: "/music/cafe.mp3",
		};

		const src = sounds[name];
		if (!src) return;

		const audio = ambientSoundRef.current;
		const isSameSound = audio.src.includes(src);

		if (isSameSound) {
			if (audio.paused) {
				audio.play();
			} else {
				audio.pause();
			}
			return;
		}

		audio.src = src;
		audio.currentTime = 0;
		audio.play();
	}

	function playCompleteSound() {
		setIsPlayingCompletedSound(true);
		const audio = musicRef.current;
		audio.pause();
		audio.loop = false;
		audio.src = "/music/complete.mp3";
		audio.play();
		audio.onended = () => {
			audio.src = "/music/lofi-cozy-1.mp3";
			audio.loop = true;
			setIsMusicPlaying(false);
			setIsPlayingCompletedSound(false);
			audio.onEnded = null;
		};
	}

	function handleChangeVolume(e) {
		setVolume(e.target.value);
		musicRef.current.volume = parseFloat(e.target.value);
		ambientSoundRef.current.volume = parseFloat(e.target.value);
		setIsMuted(e.target.value == 0);
	}

	function mute() {
		setVolume(0);
		musicRef.current.volume = 0;
		ambientSoundRef.current.volume = 0;
		setIsMuted(true);
	}

	useEffect(() => {
		if (isMusicPlaying) {
			musicRef.current.play();
		} else {
			musicRef.current.pause();
		}
	}, [isMusicPlaying]);

	useEffect(() => {
		if (volume == 0) {
			setIsMuted(true);
		} else {
			setIsMuted(false);
		}
	}, [volume]);

	return (
		<main className="bg-main-bg h-dvh grid grid-cols-3 font-itim">
			<div className="LEFT flex justify-center items-center">
				<div className="WRAPPER">
					<span className="relative">
						<img
							src="/images/music-player.png"
							alt="music"
							width={250}
							draggable={false}
						/>
						<div className="musicControls w-full absolute bottom-5 right-[50%] translate-x-1/2 flex flex-col">
							<span className="text-center text-2xl">Lofi Sounds</span>
							<div className="flex justify-center items-center gap-2">
								<button
									className="cursor-pointer"
									onClick={() => {
										setIsMusicPlaying(!isMusicPlaying);
									}}
								>
									{isMusicPlaying ? (
										<FaPause size={15} />
									) : (
										<FaPlay size={15} />
									)}
								</button>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									className="w-30 h-3 bg-slider border-1 border-border rounded-xs appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-slider-thumb [&::-webkit-slider-thumb]:outline-1 [&::-webkit-slider-thumb]:outline-border"
									onChange={handleChangeVolume}
									value={volume}
								/>
								<button className="cursor-pointer" onClick={mute}>
									{isMuted ? (
										<FaVolumeMute size={20} />
									) : (
										<FaVolumeUp size={20} />
									)}
								</button>
							</div>
						</div>
					</span>

					<audio src="/music/lofi-cozy-1.mp3" ref={musicRef} loop />
				</div>
			</div>

			<div className="CENTER flex flex-col justify-evenly items-center">
				<img src="/images/logo.png" alt="logo" width={250} draggable={false} />
				<img
					src="/images/candle.png"
					alt="candle"
					className="block"
					width={300}
					draggable={false}
				/>
				<Timer
					setIsMusicPlaying={setIsMusicPlaying}
					resetMusic={resetMusic}
					playCompleteSound={playCompleteSound}
					isPlayingCompletedSound={isPlayingCompletedSound}
				/>
			</div>

			<div className="RIGHT flex justify-center items-center">
				<div
					className="WRAPPER w-75 h-90 rounded-xl p-5 flex flex-col outline-1 outline-border bg-gradient-to-br 
  from-[#FEF8F2] 
  via-[#FCECD4] 
  to-[#F9E5D0]"
				>
					{/* Ambient sound player */}
					<audio src="/music/rain-sound.mp3" ref={ambientSoundRef} loop />

					<div className="my-5 text-center text-xl font-semibold">
						Ambient Sounds
					</div>
					<div className="BUTTONS_CONTAINER grid grid-cols-2 gap-4 grid-rows-2 grow min-h-0">
						{/* Rain Button */}
						<button
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0 bg-rain-bg transition-all duration-200 hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)]"
							onClick={playAmbientSound}
							name="rain"
						>
							<img
								src="/images/rain.png"
								alt="rain"
								className="h-20"
								draggable={false}
							/>
							<span>Rain</span>
						</button>
						{/* Firecamp Button */}
						<button
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0 bg-firecamp-bg transition-all duration-200 hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)]"
							onClick={playAmbientSound}
							name="firecamp"
						>
							<img
								src="/images/firecamp.png"
								alt="firecamp"
								className="h-20"
								draggable={false}
							/>
							<span>Firecamp</span>
						</button>
						{/* Forest Button */}
						<button
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0 bg-forest-bg transition-all duration-200 hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)]"
							onClick={playAmbientSound}
							name="forest"
						>
							<img
								src="/images/forest.png"
								alt="forest"
								className="h-20"
								draggable={false}
							/>
							<span>Forest</span>
						</button>
						{/* Cafe Button */}
						<button
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0 bg-cafe-bg transition-all duration-200 hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_70%)]"
							onClick={playAmbientSound}
							name="cafe"
						>
							<img
								src="/images/cafe.png"
								alt="cafe"
								className="h-20"
								draggable={false}
							/>
							<span>Cafe</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
