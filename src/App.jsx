import { useRef, useState, useEffect } from "react";
import Timer from "./components/Timer";

function App() {
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);
	const [isAmbientSoundPlaying, setIsAmbientSoundPlaying] = useState(false);

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

		// Same sound → toggle play/pause
		if (isSameSound) {
			if (audio.paused) {
				audio.play(); // resumes from where it stopped
			} else {
				audio.pause();
			}
			return;
		}

		// Different sound → start fresh
		audio.src = src;
		audio.currentTime = 0;
		audio.play();
	}

	useEffect(() => {
		if (isMusicPlaying) {
			musicRef.current.play();
		} else {
			musicRef.current.pause();
		}
	}, [isMusicPlaying]);

	return (
		<main className="bg-main-bg h-dvh grid grid-cols-3 font-itim">
			<div className="LEFT flex justify-center items-center">
				<div className="WRAPPER">
					<img
						src="/images/music-player.png"
						alt="music"
						width={250}
						draggable={false}
					/>

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
				<Timer setIsMusicPlaying={setIsMusicPlaying} resetMusic={resetMusic} />
			</div>
			<div className="RIGHT flex justify-center items-center">
				<div className="WRAPPER bg-secondary-bg w-75 h-90 rounded-xl p-5 flex flex-col outline-1 outline-border">
					{/* Ambient sound player */}
					<audio src="/music/rain-sound.mp3" ref={ambientSoundRef} loop />

					<div className="my-5 text-center text-xl font-semibold">
						Ambient Sounds
					</div>
					<div className="BUTTONS_CONTAINER grid grid-cols-2 gap-4 grid-rows-2 grow min-h-0">
						{/* Rain Button */}
						<button
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0"
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
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0"
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
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0"
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
							className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0"
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
