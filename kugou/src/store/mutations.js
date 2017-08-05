import Vue from 'vue'
import getSkin from '../config/skin-config.js'
export const toggleOnOff = (state, obj) => {
  state.skin[obj.key].map((val, _index) => {
    if (obj.index === _index) {
      val.selected = 1
    } else {
      val.selected = 0
    }
  })
}

export const pressup = (state, obj) => {
  if (obj.index !== undefined) {
    state.skin[obj.key][obj.index].selected = 0
    return
  }
  state.skin[obj.key].selected = 0
}
export const press = (state, obj) => {
  if (obj.index !== undefined) {
    state.skin[obj.key][obj.index].selected = 1
    return
  }
  state.skin[obj.key].selected = 1
}

export const setAudio = (state, data) => {
  state.audio = {
    ...data
  }
}

export const setRateOfProgress = (state, {
  event,
  id,
  btn
}) => {
  // if (!state.playing)
  //  return
  let {
    x
  } = event.center
  let btnWidth = document.querySelector(btn).getBoundingClientRect().width
  let {
    width,
    left
  } = document.getElementById(id).getBoundingClientRect()
  let offsetLeft = x - left
  let rateWidth = Math.min(Math.max(offsetLeft - btnWidth / 4, 0), width) // 0-width
  let audio = document.getElementById('audio')
  audio.pause()
  state.playing = false
  let currentTime = rateWidth / width * audio.duration
  audio.currentTime = currentTime
  state.currentTime = currentTime
  state.lyricIndex = 0
  state.rate_of_progress = `${currentTime / audio.duration * 100}%`
}

export const stop = state => {
  state.playing = false
}

export const play = state => {
  state.playing = true
}

export const timeupdate = state => {
  let {
    currentTime,
    duration
  } = document.getElementById('audio')
  state.rate_of_progress = `${currentTime / duration * 100}%`
  state.currentTime = currentTime
}

export const setSearchSongs = (state, data) => {
  state.searchSongs = data
}

export const comcatSearchSongs = (state, data) => {
  state.searchSongs = state.searchSongs.concat(data)
}

export const getHistoryList = (state) => {
  if (state.historyList.length === 0 && localStorage) {
    state.historyList = JSON.parse(localStorage.getItem('historyList')) || []
  }
}

export const clearHistoryList = (state) => {
  localStorage.removeItem('historyList')
  state.historyList = []
}

export const getHotList = (state) => {
  state.hotList = ['金曲捞', '音乐故事', '徐佳莹', '其实都没有', '张碧晨', '李宇春 在吗', '友情卡片']
}

export const pushHistoryList = (state, key) => {
  let his = state.historyList
  // his.push(key)
  his.unshift(key)
  his = [...new Set(his)]
  state.historyList = his
  localStorage.setItem('historyList', JSON.stringify(his))
}

export const deleteHisItem = (state, index) => {
  state.historyList.splice(index, 1)
  localStorage.setItem('historyList', JSON.stringify(state.historyList))
}

export const addInPlayList = (state, newaudio) => {
  let {
    audio,
    playList
  } = state
  for (let i = 0; i < playList.length; i++) {
    if (playList[i].hash === newaudio.hash) {
      return
    }
  }
  if (audio.play_url !== '' && audio.hash) {
    for (let i = 0; i < playList.length; i++) {
      if (playList[i].hash === audio.hash) {
        state.playList.splice(++i, 0, newaudio)
        break
      }
    }
  } else {
    state.playList.push(newaudio)
  }
  localStorage.setItem('playList', JSON.stringify(state.playList))
}

export const changePlayType = (state, cb) => {
  let {
    playType,
    playTypes
  } = state
  playTypes.forEach((val, index) => {
    if (val === playType) {
      state.playType = playTypes[++index % playTypes.length]
      typeof cb === 'function' && cb()
      localStorage.setItem('playType', state.playType)
    }
  })
}

export const clearPlayList = (state) => {
  localStorage.removeItem('playList')
  state.playList = []
  state.audio = {
    play_url: '',
    lyrics: '',
    img: '',
    author_name: '',
    audio_name: '',
    timelength: 0,
  }
}

export const deletePlayItem = (state, {
  index,
  audioIndex,
  playing
}) => {
  state.playList.splice(index, 1)
  console.log('playing:' + playing)
  if (index === audioIndex) {
    let {
      playList,
    } = state
    if (playList.length > 0) {
      state.audio = playList[Math.min(index, playList.length - 1)]
      if (playing) {
        console.log('playing')
        Vue.nextTick(() => {
          let audio = document.getElementById('audio')
          audio.play()
          state.play = true
          let timer = setInterval(() => {
            if (audio.played.length === 0) {
              audio.play()
              state.play = true
            } else {
              clearInterval(timer)
            }
          }, 300)
        })
      } else {
        console.log('stoping')
      }
    } else {
      state.playList = []
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
}

export const createdGetAudio = (state, cb) => {
  state.playList = JSON.parse(localStorage.getItem('playList')) || []
  console.log(state.playList)
  let audioIndex = parseInt(localStorage.getItem('audioIndex'))
  if (isNaN(audioIndex) || audioIndex === -1 || state.playList.length === 0) {
    typeof cb === 'function' && cb()
    return
  }
  state.audio = state.playList[audioIndex]
}

export const changePlaySong = (state, {
  index,
  audioIndex
}) => {
  // 切换开关
  if (index === audioIndex) {
    let {
      playing
    } = state
    let audio = document.getElementById('audio')
    if (playing) {
      audio.pause()
      state.playing = false
    } else {
      audio.play()
      state.playing = true
    }
  } else {
    state.audio = state.playList[index]
    state.lyricIndex = 0
    Vue.nextTick(() => {
      let audio = document.getElementById('audio')
      audio.play()
      state.playing = true
      let timer = setInterval(() => {
        if (audio.played.length === 0) {
          audio.play()
          state.playing = true
        } else {
          clearInterval(timer)
        }
      }, 300)
    })
  }
}

export const audioEnd = (state, audioIndex) => {
  // '顺序播放', '随机播放', '单曲循环'
  let {
    playList,
    playType
  } = state
  state.lyricIndex = 0
  if (playType === '单曲循环' || playList.length < 2) {
    document.getElementById('audio').currentTime = 0
  } else if (playType === '顺序播放') {
    let next = ++audioIndex % playList.length
    state.audio = playList[next]
  } else if (playType === '随机播放') {
    let next = audioIndex
    while (audioIndex === next) {
      next = Math.floor(Math.random() * playList.length)
    }
    state.audio = playList[next]
  }
  Vue.nextTick(() => {
    let audio = document.getElementById('audio')
    audio.play()
    state.playing = true
    let timer = setInterval(() => {
      if (audio.played.length === 0) {
        audio.play()
        state.playing = true
      } else {
        clearInterval(timer)
      }
    }, 300)
  })
}

export const nextSong = (state, audioIndex) => {
  // '顺序播放', '随机播放', '单曲循环'
  let {
    playList,
    playType
  } = state
  // 少于2首时 直接返回
  if (playList.length < 2) {
    return
  }
  state.lyricIndex = 0
  if (playType === '顺序播放' || playType === '单曲循环') {
    let next = ++audioIndex % playList.length
    console.log(audioIndex, playList.length, next)
    state.audio = playList[next]
  } else if (playType === '随机播放') {
    let next = audioIndex
    while (audioIndex === next) {
      next = Math.floor(Math.random() * playList.length)
      console.log(next)
    }

    state.audio = playList[next]
  }
  Vue.nextTick(() => {
    let audio = document.getElementById('audio')
    audio.play()
    state.playing = true
    let timer = setInterval(() => {
      if (audio.played.length === 0) {
        audio.play()
        state.playing = true
      } else {
        clearInterval(timer)
      }
    }, 300)
  })
}

export const setSkin = (state, id) => {
  state.skin = getSkin(id)
}

export const setThemes = (state, data) => {
  state.themes = state.themes.concat(data.info)
}
