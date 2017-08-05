import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import love from '@/components/love/love'
import download from '@/components/download/download'
import recent from '@/components/recent/recent'
import songList from '@/components/song-list/song-list'
import localSongs from '@/components/local-songs/local-songs'
import musicLibrary from '@/components/music-library/music-library'
import station from '@/components/station/station'
import kuGroup from '@/components/ku-group/ku-group'
import search from '@/components/search/search'
import searchresult from '@/components/search/searchresult'
import searchHistory from '@/components/search/history'
import theme from '@/components/theme/theme'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '/2/search',
    name: 'search',
    component: search,
    children: [{
      path: 'result',
      name: 'searchresult',
      component: searchresult,
    }, {
      path: '',
      name: 'searchHistory',
      component: searchHistory,
    }]
  }, {
    path: '/2/love',
    name: 'love',
    component: love
  }, {
    path: '/2/recent',
    name: 'recent',
    component: recent
  }, {
    path: '/2/download',
    name: 'download',
    component: download
  }, {
    path: '/2/songList',
    name: 'songList',
    component: songList
  }, {
    path: '/2/localSongs',
    name: 'localSongs',
    component: localSongs
  }, {
    path: '/2/musicLibrary',
    name: 'musicLibrary',
    component: musicLibrary
  }, {
    path: '/2/station',
    name: 'station',
    component: station
  }, {
    path: '/2/kuGroup',
    name: 'kuGroup',
    component: kuGroup
  }, {
    path: '/2/theme',
    name: 'theme',
    component: theme,
    meta: {
      hidePlayBar: true
    }
  }]
})
