import Vue from 'vue'
import Vuex from 'vuex'
import getSkin, {skins, skinConfig} from '../config/skin-config.js'
import defaultSong from '../config/song-config.js'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)
const playType = localStorage.getItem('playType') || '顺序播放'
const store = new Vuex.Store({
  state: {
    skin: getSkin(),
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
    lyricIndex: 0,
    page: 1,
    pagesize: 20,
    recommandsize: 10,
    searchSongs: [],
    historyList: [],
    hotList: [],
    playList: [],
    playTypes: ['顺序播放', '随机播放', '单曲循环'],
    playType,
    skins,
    themes: [skins],
    skinId: skinConfig.id
  },
  getters,
  actions,
  mutations
})

export default store
