import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import skin from '../config/skin-config.js'
import defaultSong from '../config/song-config.js'
import {
	formatTime,
	timeToSecond,
	formatTimeDouble
} from '../util';
import {
	apis
} from '../config/server.js'
Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
	state: {
		...skin,
		total: 1,
		...defaultSong,
		audio: {
			play_url: '',
			lyrics: '',
			img: '',
			author_name: '',
			audio_name: '',
			timelength: 0,
		},
		currentTime: 0,
		rate_of_progress: '0%',
		playing: false,
		lyric_index: 0,
		page: 1,
		pagesize: 20,
		recommandsize: 10,
		searchSongs: [],
	},
	getters: {
		lyricArray: state => {
			if (state.audio.lyrics.length == 0)
				return [];
			let lyricArray = [];
			let regTime = /\[\d*:\d*((\.|\:)\d*)*\]/g
			let times = state.audio.lyrics.match(regTime);
			let regLyric = /\](.*)\r\n/g;
			let lyrics = state.audio.lyrics.match(regLyric);
			times.forEach((val, index) => {
				lyricArray.push({
					time: val.substr(1, 8),
					lyric: lyrics[index].substring(1).replace(/\r\n$/mg, '')
				})
			})
			lyricArray.push({
				time: formatTimeDouble(state.audio.timelength / 1000),
				lyric: ''
			})
			return lyricArray
		},
		currentLyrics: (state, getters) => {
			let currentLyrics = [];
			let lyricArray = getters.lyricArray;
			let {
				currentTime,
				lyric_index
			} = state;
			if (lyricArray.length == 0 || currentTime == 0) {
				return currentLyrics;
			} else {
				for (let i = lyric_index; i < lyricArray.length; i += 2) {
					let lyricTime = timeToSecond(lyricArray[i].time);
					// if (i == 0 && lyricTime >= currentTime) {
					// 	state.lyric_index = i;
					// 	return lyricArray[i].lyric;
					// } else if (lyricTime >= currentTime) {
					// 	state.lyric_index = i;
					// 	return lyricArray[i - 1].lyric;
					// }
					if (i == 0 && lyricTime >= currentTime) {
						state.lyric_index = i
						currentLyrics.push({
							lyric: lyricArray[i].lyric,
							index: i
						});
						currentLyrics.push({
							lyric: lyricArray[i + 1].lyric,
							index: i + 1
						});
						return currentLyrics;
					} else if (i == lyricArray.length - 2 || i == lyricArray.length - 1) {
						state.lyric_index = i
						currentLyrics.push({
							lyric: lyricArray[i - 1].lyric,
							index: i - 1
						});
						currentLyrics.push({
							lyric: lyricArray[i].lyric,
							index: i
						});
						return currentLyrics;
					} else if (lyricTime >= currentTime) {
						state.lyric_index = i
						currentLyrics.push({
							lyric: lyricArray[i - 2].lyric,
							index: i - 2
						});
						currentLyrics.push({
							lyric: lyricArray[i - 1].lyric,
							index: i - 1
						});
						return currentLyrics;
					}
				}
			}
			return currentLyrics;
		},
		currentTimeFormat: (state) => {
			return formatTime(state.currentTime)
		}
	},
	mutations: {
		toggleOnOff(state, obj) {
			state[obj.key].map((val, _index) => {
				if (obj.index == _index) {
					val.selected = 1;
				} else {
					val.selected = 0;
				}
			})
		},
		pressup(state, obj) {
			if (obj.index != undefined) {
				state[obj.key][obj.index].selected = 0;
				return;
			}
			state[obj.key].selected = 0;
		},
		press(state, obj) {
			if (obj.index != undefined) {
				state[obj.key][obj.index].selected = 1;
				return;
			}
			state[obj.key].selected = 1;
		},
		setAudio(state, data) {
			state.audio = {
				...data
			};
		},
		setRateOfProgress(state, {
			event,
			id,
			btn
		}) {
			if (!state.playing)
				return;
			let {
				x
			} = event.center;
			let btnWidth = document.querySelector(btn).getBoundingClientRect().width;
			let {
				width,
				left
			} = document.getElementById(id).getBoundingClientRect();
			let offsetLeft = x - left;
			let rate_width = Math.min(Math.max(offsetLeft - btnWidth / 4, 0), width); //0-width
			let audio = document.getElementById('audio');
			audio.pause();
			let currentTime = rate_width / width * audio.duration;
			audio.currentTime = currentTime
			state.currentTime = currentTime;
			state.lyric_index = 0;
			state.rate_of_progress = `${currentTime/audio.duration*100}%`;
		},
		stop(state) {
			state.playing = false;
		},
		play(state) {
			state.playing = true;
		},
		timeupdate(state) {
			let {
				currentTime,
				duration
			} = document.getElementById('audio');
			state.rate_of_progress = `${currentTime/duration*100}%`;
			state.currentTime = currentTime;
		},
		setSearchSongs(state, data) {
			state.searchSongs = data;
		},
		comcatSearchSongs(state, data) {
			state.searchSongs = state.searchSongs.concat(data);
		}
	},
	actions: {
		getSong(state, {
			hash,
			album_id,
			cb
		}) {
			Vue.http.get(apis.getSong, {
				params: {
					hash: hash,
					album_id: album_id
				}
			}, {
				emulateJSON: true
			}).then(res => {
				state.commit('setAudio', res.body.data);
				typeof cb == 'function' && cb();
			})
		},
		songSearch(state, {
			key,
			page,
			pagesize,
			flag,
			cb
		}) {
			Vue.http.get(apis.searchSong, {
				params: {
					keyword: key,
					page: page,
					pagesize: pagesize
				}
			}, {
				emulateJSON: true
			}).then(res => {

				if (flag) {
					state.commit('comcatSearchSongs', res.body.data.lists);
				} else {
					state.commit('setSearchSongs', res.body.data.lists)
				}
				typeof cb == 'function' && cb();
			})
		},
	}
})

export default store