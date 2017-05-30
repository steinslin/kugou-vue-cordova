import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import skin from '../config/skin-config.js'
import defaultSong from '../config/song-config.js'
import {
	Toast
} from 'mint-ui';
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
const playType = localStorage.getItem('playType') || '顺序播放';
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
		historyList: [],
		hotList: [],
		playList: [],
		playTypes: ['顺序播放', '随机播放', '单曲循环'],
		playType
	},
	getters: {
		lyricArray: state => {
			if (!state.audio.lyrics || state.audio.lyrics.length == 0)
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
			console.log(lyricArray.length);
			console.log(lyric_index);
			if (lyricArray.length == 0) {
				console.log('error');
				return currentLyrics;
			} else {
				for (let i = lyric_index; i < lyricArray.length; i += 2) {
					let lyricTime = timeToSecond(lyricArray[i].time);
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
		},
		audioIndex: (state) => {
			let {
				playList,
				audio
			} = state;
			for (let i = 0; i < playList.length; i++) {
				if (playList[i].hash === audio.hash) {
					localStorage.setItem('audioIndex', i)
					return i;
				}
			}
			localStorage.setItem('audioIndex', -1);
			return -1;
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
			// if (!state.playing)
			// 	return;
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
			state.playing = false;
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
		},
		getHistoryList(state) {
			if (state.historyList.length == 0 && localStorage) {
				state.historyList = JSON.parse(localStorage.getItem('historyList')) || [];
			}
			//	state.historyList = ['初音未来', 'miku']
		},
		clearHistoryList(state) {
			localStorage.removeItem('historyList')
			state.historyList = [];
		},
		getHotList(state) {

			state.hotList = ['金曲捞', '音乐故事', '徐佳莹', '其实都没有', '张碧晨', '李宇春 在吗', '友情卡片']
		},
		pushHistoryList(state, key) {
			let his = state.historyList;
			// his.push(key);
			his.unshift(key);
			his = [...new Set(his)];
			state.historyList = his;
			localStorage.setItem('historyList', JSON.stringify(his))
		},
		deleteHisItem(state, index) {
			state.historyList.splice(index, 1);
			localStorage.setItem('historyList', JSON.stringify(state.historyList))
		},
		addInPlayList(state, newaudio) {
			let {
				audio,
				playList
			} = state;
			for (let i = 0; i < playList.length; i++) {
				if (playList[i].hash === newaudio.hash) {
					return;
				}
			}
			if (audio.play_url != '' && audio.hash) {
				for (let i = 0; i < playList.length; i++) {
					if (playList[i].hash === audio.hash) {
						state.playList.splice(++i, 0, newaudio);
						break;
					}
				}
			} else {
				state.playList.push(newaudio);
			}
			localStorage.setItem('playList', JSON.stringify(state.playList))

		},
		changePlayType(state, cb) {
			let {
				playType,
				playTypes
			} = state;
			let _index = 0;
			playTypes.forEach((val, index) => {
				if (val === playType) {
					state.playType = playTypes[++index % playTypes.length];
					typeof cb == 'function' && cb();
					localStorage.setItem('playType', state.playType);
					return;
				}
			})
		},
		clearPlayList(state) {
			localStorage.removeItem('playList')
			state.playList = [];
			state.audio = {
				play_url: '',
				lyrics: '',
				img: '',
				author_name: '',
				audio_name: '',
				timelength: 0,
			}
		},
		deletePlayItem(state, {
			index,
			audioIndex,
			playing
		}) {
			state.playList.splice(index, 1);
			console.log('playing:' + playing);
			if (index === audioIndex) {
				let {
					playList,
				} = state
				if (playList.length > 0) {
					state.audio = playList[Math.min(index, playList.length - 1)]
					if (playing) {
						console.log('playing');
						Vue.nextTick(() => {
							let audio = document.getElementById('audio');
							audio.play();
							state.play = true;
							let timer = setInterval(() => {
								if (audio.played.length == 0) {
									audio.play()
									state.play = true;
								} else {
									clearInterval(timer)
								}
							}, 300)
						})
					} else {
						console.log('stoping')
					}
				} else {
					state.playList = [];
					state.audio = {
						play_url: '',
						lyrics: '',
						img: '',
						author_name: '',
						audio_name: '',
						timelength: 0,
					}
				}
			}
			localStorage.setItem('playList', JSON.stringify(state.playList))
		},
		createdGetAudio(state, cb) {
			state.playList = JSON.parse(localStorage.getItem('playList')) || [];
			console.log(state.playList);
			let audioIndex = parseInt(localStorage.getItem('audioIndex'))
			if (isNaN(audioIndex) || audioIndex === -1 || state.playList.length === 0) {
				typeof cb == 'function' && cb();
				return;
			}
			state.audio = state.playList[audioIndex];
		},
		changePlaySong(state, {
			index,
			audioIndex
		}) {
			//切换开关
			if (index === audioIndex) {
				let {
					playing
				} = state;
				let audio = document.getElementById('audio');
				if (playing) {
					audio.pause();
					state.playing = false
				} else {
					audio.play();
					state.playing = true;
				}
			} else {
				state.audio = state.playList[index];
				state.lyric_index = 0;
				Vue.nextTick(() => {
					let audio = document.getElementById('audio');
					audio.play();
					state.playing = true;
					let timer = setInterval(() => {
						if (audio.played.length == 0) {
							audio.play()
							state.playing = true;
						} else {
							clearInterval(timer)
						}
					}, 300)
				})
			}
		},
		audioEnd(state, audioIndex) {
			//'顺序播放', '随机播放', '单曲循环'
			let {
				playList,
				playType
			} = state;
			state.lyric_index = 0;
			if (playType === '单曲循环' || playList.length < 2) {
				document.getElementById('audio').currentTime = 0;
			} else if (playType === '顺序播放') {
				let next = ++audioIndex % playList.length;
				state.audio = playList[next];
			} else if (playType === '随机播放') {
				let next = audioIndex;
				while (audioIndex === next) {
					next = Math.floor(Math.random() * playList.length)
				}
				state.audio = playList[next]
			}
			Vue.nextTick(() => {
				let audio = document.getElementById('audio');
				audio.play();
				state.playing = true;
				let timer = setInterval(() => {
					if (audio.played.length == 0) {
						audio.play()
						state.playing = true;
					} else {
						clearInterval(timer)
					}
				}, 300)
			})
		},
		nextSong(state, audioIndex) {
			//'顺序播放', '随机播放', '单曲循环'
			let {
				playList,
				playType
			} = state;
			//少于2首时 直接返回
			if (playList.length < 2) {
				return;
			}
			state.lyric_index = 0;
			if (playType === '顺序播放' || playType === '单曲循环') {

				let next = ++audioIndex % playList.length;
				console.log(audioIndex, playList.length, next)
				state.audio = playList[next];
			} else if (playType === '随机播放') {
				let next = audioIndex;
				while (audioIndex === next) {
					next = Math.floor(Math.random() * playList.length)
					console.log(next);
				}

				state.audio = playList[next]
			}
			Vue.nextTick(() => {
				let audio = document.getElementById('audio');
				audio.play();
				state.playing = true;
				let timer = setInterval(() => {
					if (audio.played.length == 0) {
						audio.play()
						state.playing = true;
					} else {
						clearInterval(timer)
					}
				}, 300)
			})
		}
	},
	actions: {
		getSong(state, {
			hash,
			album_id,
			cb,
			flag = true
		}) {
			Vue.http.get(apis.getSong, {
				params: {
					hash: hash,
					album_id: album_id
				}
			}, {
				emulateJSON: true
			}).then(res => {
				res.body.data.hash = hash;
				//加入到播放队列
				state.commit('addInPlayList', res.body.data);
				//修改播放音频
				if (flag) {
					state.commit('setAudio', res.body.data);
				}
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
			if (key) {
				state.commit('pushHistoryList', key)
			}
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