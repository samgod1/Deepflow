import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";

const Timer = ({ setIsMusicPlaying, resetMusic }) => {
	const [inputs, setInputs] = useState({ h: "00", m: "20", s: "00" });
	const [timeLeft, setTimeLeft] = useState(20 * 60 * 1000);
	const [isRunning, setIsRunning] = useState(false);
	const [isEditing, setIsEditing] = useState(true);

	const intervalRef = useRef(null);

	const toggleTimer = () => {
		if (!isRunning) {
			setIsEditing(false);
			setIsMusicPlaying(true);
			const endTime = Date.now() + timeLeft;

			intervalRef.current = setInterval(() => {
				const remaining = Math.max(0, endTime - Date.now());
				setTimeLeft(remaining);

				if (remaining <= 0) {
					clearInterval(intervalRef.current);
					setIsRunning(false);
				}
			}, 100);
		} else {
			setIsMusicPlaying(false);
			clearInterval(intervalRef.current);
		}
		setIsRunning(!isRunning);
	};

	function reset() {
		clearInterval(intervalRef.current);
		setIsRunning(false);
		setIsEditing(true);
		setTimeLeft(20 * 60 * 1000);
		setInputs({ h: "00", m: "20", s: "00" });
		resetMusic();
	}

	function handleChange(e) {
		const { name, value } = e.target;
		const val = value.replace(/[^0-9]/g, "").slice(0, 2);

		const newInputs = { ...inputs, [name]: val };
		setInputs(newInputs);

		const h = parseInt(newInputs.h) || 0;
		const m = parseInt(newInputs.m) || 0;
		const s = parseInt(newInputs.s) || 0;
		setTimeLeft((h * 3600 + m * 60 + s) * 1000);
	}

	const hours = Math.floor(timeLeft / (1000 * 60 * 60));
	const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((timeLeft / 1000) % 60);

	const format = (num) => String(num).padStart(2, "0");
	const inputBase =
		"bg-transparent border-none outline-none p-0 m-0 w-[2.1ch] text-center font-inherit";

	return (
		<div className="w-full flex flex-col items-center gap-2">
			<div className="text-7xl font-bold text-timer tabular-nums">
				{isEditing ? (
					<div className="flex items-center">
						<input
							name="h"
							value={inputs.h}
							onChange={handleChange}
							className={inputBase}
						/>
						<span className="mb-2">:</span>
						<input
							name="m"
							value={inputs.m}
							onChange={handleChange}
							className={inputBase}
						/>
						<span className="mb-2">:</span>
						<input
							name="s"
							value={inputs.s}
							onChange={handleChange}
							className={inputBase}
						/>
					</div>
				) : (
					<div
						className={`flex items-center ${
							!isRunning ? "cursor-pointer" : ""
						}`}
						onClick={() => {
							if (!isRunning) {
								setIsEditing(true);
								setInputs({
									h: format(hours),
									m: format(minutes),
									s: format(seconds),
								});
							}
						}}
					>
						<input
							className={`${inputBase} pointer-events-none`}
							value={format(hours)}
							readOnly
						/>
						<span className="mb-2">:</span>
						<input
							className={`${inputBase} pointer-events-none`}
							value={format(minutes)}
							readOnly
						/>
						<span className="mb-2">:</span>
						<input
							className={`${inputBase} pointer-events-none`}
							value={format(seconds)}
							readOnly
						/>
					</div>
				)}
			</div>
			<div className="Buttons text-buttons w-full flex justify-center gap-4">
				<button className="PAUSE-PLAY cursor-pointer" onClick={toggleTimer}>
					{isRunning ? <FaPause size={35} /> : <FaPlay size={35} />}
				</button>
				<button className="RESET cursor-pointer" onClick={reset}>
					<RiResetLeftFill size={35} />
				</button>
			</div>
		</div>
	);
};

export default Timer;
