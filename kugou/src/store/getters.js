import {
  formatTime,
  timeToSecond,
  formatTimeDouble
} from '../util'

export const lyricArray = state => {
  if (!state.audio.lyrics || state.audio.lyrics.length === 0) {
    return []
  }
  let lyricArray = []
  let regTime = /\[\d*:\d*((\.|:)\d*)*\]/g
  let times = state.audio.lyrics.match(regTime)
  let regLyric = /\](.*)\r\n/g
  let lyrics = state.audio.lyrics.match(regLyric)
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
}

export const currentLyrics = (state, getters) => {
  let currentLyrics = []
  let lyricArray = getters.lyricArray
  let {
    currentTime,
    lyricIndex
  } = state
  // console.log(lyricArray.length)
  // console.log(lyricIndex)
  if (lyricArray.length === 0) {
    return currentLyrics
  } else {
    for (let i = lyricIndex; i < lyricArray.length; i += 2) {
      let lyricTime = timeToSecond(lyricArray[i].time)
      if (i === 0 && lyricTime >= currentTime) {
        state.lyricIndex = i
        currentLyrics.push({
          lyric: lyricArray[i].lyric,
          index: i
        })
        currentLyrics.push({
          lyric: lyricArray[i + 1].lyric,
          index: i + 1
        })
        return currentLyrics
      } else if (i === lyricArray.length - 2 || i === lyricArray.length - 1) {
        state.lyricIndex = i
        currentLyrics.push({
          lyric: lyricArray[i - 1].lyric,
          index: i - 1
        })
        currentLyrics.push({
          lyric: lyricArray[i].lyric,
          index: i
        })
        return currentLyrics
      } else if (lyricTime >= currentTime) {
        state.lyricIndex = i
        currentLyrics.push({
          lyric: lyricArray[i - 2].lyric,
          index: i - 2
        })
        currentLyrics.push({
          lyric: lyricArray[i - 1].lyric,
          index: i - 1
        })
        return currentLyrics
      }
    }
  }
  return currentLyrics
}

export const currentTimeFormat = state => {
  return formatTime(state.currentTime)
}

export const audioIndex = state => {
  let {
    playList,
    audio
  } = state
  for (let i = 0; i < playList.length; i++) {
    if (playList[i].hash === audio.hash) {
      localStorage.setItem('audioIndex', i)
      return i
    }
  }
  localStorage.setItem('audioIndex', -1)
  return -1
}
