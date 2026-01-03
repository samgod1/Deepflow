import { useRef, useState, useEffect, useCallback } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import Timer from "./components/Timer";

import { ambientSounds, allMusicList } from "./constants";

function App() {
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);
	const [isPlayingCompletedSound, setIsPlayingCompletedSound] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isMuted, setIsMuted] = useState(false);

	const [playlist, setPlaylist] = useState(() => {
		const arr = [...allMusicList];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	});
	const [currentIndex, setCurrentIndex] = useState(0);

	const musicRef = useRef(null);
	const ambientSoundRef = useRef(null);

	const shuffle = useCallback((array) => {
		const newArr = [...array];
		for (let i = newArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
		}
		return newArr;
	}, []);

	const handleMusicEnded = useCallback(() => {
		// If the 'Timer Complete' sound just finished
		if (isPlayingCompletedSound) {
			setIsPlayingCompletedSound(false);
			setIsMusicPlaying(false);
			// Reset source back to the current song in playlist
			musicRef.current.src = playlist[currentIndex];
			return;
		}

		// Logic for shuffling/moving to next song
		if (currentIndex >= playlist.length - 1) {
			const newShuffledList = shuffle(allMusicList);
			setPlaylist(newShuffledList);
			setCurrentIndex(0);
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	}, [currentIndex, playlist, shuffle, isPlayingCompletedSound]);

	function resetMusic() {
		musicRef.current.pause();
		musicRef.current.currentTime = 0;
		setIsMusicPlaying(false);
	}

	function playAmbientSound(e) {
		const { name } = e.currentTarget;

		const src = ambientSounds[name];
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
		musicRef.current.src = "/music/soundEffect/complete.mp3";
		musicRef.current.play();
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

	useEffect(() => {
		if (playlist.length > 0 && !isPlayingCompletedSound) {
			musicRef.current.src = playlist[currentIndex];
			if (isMusicPlaying) musicRef.current.play();
		}
	}, [currentIndex, playlist, isPlayingCompletedSound]);

	return (
		<main className="bg-main-bg min-h-dvh min-[500px]:h-dvh flex flex-col min-[500px]:grid min-[500px]:grid-cols-3 font-itim">
			<div className="LEFT order-3 min-[500px]:order-none flex justify-center items-center py-10 min-[500px]:py-0">
				<div className="WRAPPER w-full max-w-[260px]">
					<span className="relative">
						<img
							src="/images/music-player.png"
							alt="music"
							className="w-full"
							draggable={false}
						/>
						<div className="musicControls w-full absolute bottom-[8%] right-[50%] translate-x-1/2 flex flex-col">
							<span className="text-center text-xl min-[725px]:text-2xl max-[725px]:text-sm">
								Lofi Sounds
							</span>
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
									className="w-[45%] h-2 min-[725px]:h-3 bg-slider border-1 border-border rounded-xs appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-slider-thumb [&::-webkit-slider-thumb]:outline-1 [&::-webkit-slider-thumb]:outline-border"
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

					<audio ref={musicRef} onEnded={handleMusicEnded} />
				</div>
			</div>

			<div className="CENTER order-1 min-[500px]:order-none flex flex-col justify-evenly items-center py-10 min-[500px]:py-0 gap-8 min-[500px]:gap-0">
				<img
					src="/images/logo.png"
					alt="logo"
					className="w-full max-w-[250px]"
					draggable={false}
				/>
				<img
					src="/images/candle.png"
					alt="candle"
					className="block w-full max-w-[300px]"
					draggable={false}
				/>
				<Timer
					setIsMusicPlaying={setIsMusicPlaying}
					resetMusic={resetMusic}
					playCompleteSound={playCompleteSound}
					isPlayingCompletedSound={isPlayingCompletedSound}
				/>
			</div>

			<div className="RIGHT order-2 min-[500px]:order-none flex justify-center items-center py-10 min-[500px]:py-0">
				<div
					className="WRAPPER w-full max-w-[300px] aspect-[300/360] rounded-xl p-5 flex flex-col outline-1 outline-border bg-gradient-to-br 
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
								className="w-[60%] object-contain"
								draggable={false}
							/>
							<span className="text-sm sm:text-base">Rain</span>
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
								className="w-[60%] object-contain"
								draggable={false}
							/>
							<span className="text-sm sm:text-base">Firecamp</span>
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
								className="w-[60%] object-contain"
								draggable={false}
							/>
							<span className="text-sm sm:text-base">Forest</span>
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
								className="w-[60%] object-contain"
								draggable={false}
							/>
							<span className="text-sm sm:text-base">Cafe</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
