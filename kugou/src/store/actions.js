import Vue from 'vue'
import {
  apis,
  host
} from '../config/server.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export const getSong = (state, {
  hash,
  album_id,
  cb,
  flag = true
}) => {
  console.log(apis.getSong, host)
  Vue.http.get(apis.getSong, {
    params: {
      hash: hash,
      album_id: album_id
    }
  }, {
    emulateJSON: true
  }).then(res => {
    res.body.data.hash = hash
    // 加入到播放队列
    state.commit('addInPlayList', res.body.data)
    // 修改播放音频
    if (flag) {
      state.commit('setAudio', res.body.data)
    }
    typeof cb === 'function' && cb()
  })
}

export const songSearch = (state, {
  key,
  page,
  pagesize,
  flag,
  cb
}) => {
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
      state.commit('comcatSearchSongs', res.body.data.lists)
    } else {
      state.commit('setSearchSongs', res.body.data.lists)
    }
    typeof cb === 'function' && cb()
  })
}

export const getTheme = state => {
  return new Promise(resolve => {
    Vue.http.get(apis.getTheme, {
      emulateJSON: true
    }).then(res => {
      console.log('res.body.data')
      state.commit('setThemes', res.body.data)
      resolve()
    }).catch(err => {
      console.log(err)
    })
  })
}
