import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Timer = () => {
	const duration = 20 * 60 * 1000;
	const [startTime, setStartTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [displayTime, setDisplayTime] = useState(duration);

	const intervalId = useRef(null);
	const displayTimeRef = useRef(0);

	useEffect(() => {
		if (isRunning) {
			intervalId.current = setInterval(() => {
				const elapsedTime = Date.now() - startTime;
				const remainingTime = duration - elapsedTime;

				if (remainingTime <= 0) {
					isRunning(false);
				}

				setDisplayTime(remainingTime);
			}, 500);
		}

		return () => {
			clearInterval(intervalId.current);
		};
	}, [isRunning]);

	function handleClick() {
		if (!isRunning) {
			setStartTime(Date.now());
		}
		setIsRunning((prev) => !prev);
	}

	const minutes = Math.floor(displayTime / 1000 / 60);
	const seconds = Math.floor((displayTime / 1000) % 60);

	return (
		<div className="w-full flex flex-col items-center gap-2">
			<span className="text-8xl font-bold text-timer">
				{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
			</span>
			<div className="Buttons text-buttons">
				<button className="cursor-pointer" onClick={handleClick}>
					{isRunning ? <FaPause size={35} /> : <FaPlay size={35} />}
				</button>
			</div>
		</div>
	);
};

export default Timer;
