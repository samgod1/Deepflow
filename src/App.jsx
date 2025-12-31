import Timer from "./components/Timer";

function App() {
	return (
		<main className="bg-main-bg h-dvh grid grid-cols-3 font-itim">
			<div className="LEFT flex justify-center items-center">
				<div className="WRAPPER">
					<img src="/images/music-player.png" alt="music" width={250} />
				</div>
			</div>
			<div className="CENTER flex flex-col justify-evenly items-center">
				<img src="/images/logo.png" alt="logo" width={250} />
				<img
					src="/images/candle.png"
					alt="candle"
					className="block"
					width={300}
				/>
				<Timer />
			</div>
			<div className="RIGHT flex justify-center items-center">
				<div className="WRAPPER bg-secondary-bg w-75 h-90 rounded-xl p-5 flex flex-col outline-1 outline-border">
					<div className="my-5 text-center text-xl font-semibold">
						Ambient Sounds
					</div>
					<div className="BUTTONS_CONTAINER grid grid-cols-2 gap-4 grid-rows-2 grow min-h-0">
						<button className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0">
							<img src="/images/rain.png" alt="rain" className="h-20" />
							<span>Rain</span>
						</button>
						<button className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0">
							<img src="/images/firecamp.png" alt="firecamp" className="h-20" />
							<span>Firecamp</span>
						</button>
						<button className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0">
							<img src="/images/forest.png" alt="forest" className="h-20" />
							<span>Forest</span>
						</button>
						<button className="outline outline-border rounded-lg flex flex-col items-center justify-between py-2 overflow-hidden cursor-pointer min-h-0">
							<img src="/images/cafe.png" alt="cafe" className="h-20" />
							<span>Cafe</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
