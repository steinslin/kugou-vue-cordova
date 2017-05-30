function formatTime(time) {
	time = Number(time);
	if (time % 60 < 10) {
		return `${parseInt(time/60)}:0${parseInt(time%60)}`;
	} else {
		return `${parseInt(time/60)}:${parseInt(time%60)}`;
	}
}

function formatTimeDouble(time) {
	time = Number(time);
	if (time / 60 < 10) {
		if (time % 60 < 10) {
			return `0${parseInt(time/60)}:0${time%60}`;
		} else {
			return `0${parseInt(time/60)}:${time%60}`;
		}
	} else {
		if (time % 60 < 10) {
			return `${parseInt(time/60)}:0${time%60}`;
		} else {
			return `${parseInt(time/60)}:${time%60}`;
		}
	}
}

function timeToSecond(time) {
	let min, second;
	if (time.length < 8) {
		second = Number(time.substr(3, 2))
	} else {
		second = Number(time.substr(3, 5));
	}
	min = Number(time.substr(0, 2));
	return min * 60 + second - 0.5;
}

module.exports = {
	formatTime,
	timeToSecond,
	formatTimeDouble
}