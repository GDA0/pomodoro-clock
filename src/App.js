import { useState, useEffect } from "react";

function App() {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);
	const [timeLeft, setTimeLeft] = useState(1500);
	const [timingType, setTimingType] = useState("SESSION");
	const [play, setPlay] = useState(false);
	const [timerZero, setTimerZero] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (timeLeft > 0 && play) {
				setTimeLeft(timeLeft - 1);
			} else if (timeLeft === 0) {
				setTimerZero(true);
			}
		}, 1000);

		return () => clearTimeout(timeout);
	}, [play, timeLeft]);

	useEffect(() => {
		if (timerZero) {
			resetTimer();
			setTimerZero(false);
		}
	}, [timerZero]);

	const handleBreakIncrease = () => {
		if (breakLength < 60) {
			setBreakLength(breakLength + 1);
		}
	};

	const handleBreakDecrease = () => {
		if (breakLength > 1) {
			setBreakLength(breakLength - 1);
		}
	};

	const handleSessionIncrease = () => {
		if (sessionLength < 60) {
			setSessionLength(sessionLength + 1);
			setTimeLeft(timeLeft + 60);
		}
	};

	const handleSessionDecrease = () => {
		if (sessionLength > 1) {
			setSessionLength(sessionLength - 1);
			setTimeLeft(timeLeft - 60);
		}
	};

	const handleReset = () => {
		setPlay(false);
		setTimeLeft(1500);
		setBreakLength(5);
		setSessionLength(25);
		setTimingType("SESSION");
		const audio = document.getElementById("beep");
		audio.pause();
		audio.currentTime = 0;
	};

	const handlePlay = () => {
		setPlay(!play);
	};

	const resetTimer = () => {
		const audio = document.getElementById("beep");
		if (timingType === "SESSION") {
			setTimeLeft(breakLength * 60);
			setTimingType("BREAK");
		} else {
			setTimeLeft(sessionLength * 60);
			setTimingType("SESSION");
		}
		if (!audio.paused) {
			audio.pause();
			audio.currentTime = 0;
		}
		audio.play();
	};

	const timeFormatter = () => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft - minutes * 60;
		const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
		return `${formattedMinutes}:${formattedSeconds}`;
	};

	const timerTitle = timingType === "SESSION" ? "Session" : "Break";

	return (
		<div className="bg-light d-flex flex-column min-vh-100">
			<header>
				<nav className="navbar bg-body-tertiary border-bottom border-2">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1 fw-bold fs-3 mx-auto">
							Pomodoro Clock
						</span>
					</div>
				</nav>
			</header>
			<main className="flex-grow-1 p-1">
				<div
					className="container bg-white rounded shadow-sm mt-5 p-2 fs-4 d-flex flex-column align-items-center gap-4"
					id="drum-machine"
					style={{ maxWidth: "360px", minHeight: "50vh" }}
				>
					<div
						className="d-flex align-items-center justify-content-between justify-content-md-around"
						style={{ width: "100%" }}
					>
						<div className="d-flex flex-column align-items-center bg-light p-1 shadow-sm">
							<div id="break-label">Break Length</div>
							<div className="d-flex align-items-center">
								<button
									className="btn"
									id="break-increment"
									onClick={handleBreakIncrease}
								>
									<i className="bi bi-arrow-up-short fs-2"></i>
								</button>
								<span id="break-length">{breakLength}</span>
								<button
									className="btn"
									id="break-decrement"
									onClick={handleBreakDecrease}
								>
									<i className="bi bi-arrow-down-short fs-2"></i>
								</button>
							</div>
						</div>
						<div className="d-flex flex-column align-items-center bg-light p-1 shadow-sm">
							<div id="session-label">Session Length</div>
							<div className="d-flex align-items-center">
								<button
									className="btn"
									id="session-increment"
									onClick={handleSessionIncrease}
								>
									<i className="bi bi-arrow-up-short fs-2"></i>
								</button>
								<span id="session-length">{sessionLength}</span>
								<button
									className="btn"
									id="session-decrement"
									onClick={handleSessionDecrease}
								>
									<i className="bi bi-arrow-down-short fs-2"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="fs-3 d-flex flex-column align-items-center">
						<div className="fs-2" id="timer-label">
							{timerTitle}
						</div>
						<span className="display-1" id="time-left">
							{timeFormatter()}
						</span>
						<div>
							<button
								className="btn fs-2"
								onClick={handlePlay}
								id="start_stop"
							>
								<i
									className={`bi bi-${
										play ? "pause" : "play"
									}-fill`}
								></i>
							</button>
							<button
								className="btn fs-2"
								onClick={handleReset}
								id="reset"
							>
								<i className="bi bi-arrow-repeat"></i>
							</button>
						</div>
					</div>
				</div>
				<audio
					id="beep"
					preload="auto"
					src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
				/>
			</main>
			<footer className="container text-center fw-medium text-secondary mt-auto">
				<p>
					&copy; {new Date().getFullYear()} Pomodoro Clock. Created By{" "}
					<a
						className="text-primary"
						href="https://github.com/GDA0"
						target="_blank"
						rel="noopener noreferrer"
					>
						Gideon D. Adeti
					</a>
					. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
}

export default App;
