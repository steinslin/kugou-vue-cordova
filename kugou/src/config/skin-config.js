let skinConfig = {
  // 4套皮肤 默认采用第3套
  selected: 2,
  skins: ['elk', 'christmaseve', 'starrysky', 'cute']
}

if (localStorage) {
  let selected = localStorage.getItem('skinConfig_selected')
  if (selected && typeof selected === 'number') {
    skinConfig.selected = selected
  }
}

function getSkin (selected) {
  let dir = `static/skins/${skinConfig.skins[selected || skinConfig.selected]}${'/res/drawable-xhdpi-v4'}`
  return {
    indexBg: `${dir}/skin_kg_navigation_local_entry_bg.png`,
    bg: `${dir}/skin_main_bg.png`,
    dialogBg: `${dir}/skin_dialog_bg.png`,
    avatar: `static/skins/avatar.jpg`,
    top_icons: [{
      icons: [`${dir}/skin_kg_comm_ic_main_top_ting_off.png`, `${dir}/skin_kg_comm_ic_main_top_ting_on.png`],
      selected: 1
    }, {
      icons: [`${dir}/skin_kg_comm_ic_main_top_kan_off.png`, `${dir}/skin_kg_comm_ic_main_top_kan_on.png`],
      selected: 0
    }, {
      icons: [`${dir}/skin_kg_comm_ic_main_top_chang_off.png`, `${dir}/skin_kg_comm_ic_main_top_chang_on.png`],
      selected: 0
    }],
    icon_search: {
      icons: [`${dir}/skin_kg_comm_ic_main_top_search_normal.png`, `${dir}/skin_kg_comm_ic_main_top_search_pressed.png`],
      selected: 0
    },
    top_action_icons: [{
      icons: [`${dir}/skin_kg_navigation_fav_normal.png`, `${dir}/skin_kg_navigation_fav_pressed.png`],
      selected: 0,
      text: '我喜欢',
    }, {
      icons: [`${dir}/skin_kg_navigation_playlist_normal.png`, `${dir}/skin_kg_navigation_playlist_pressed.png`],
      selected: 0,
      text: '歌单',
    }, {
      icons: [`${dir}/skin_kg_navigation_download_normal.png`, `${dir}/skin_kg_navigation_download_pressed.png`],
      selected: 0,
      text: '下载',
    }, {
      icons: [`${dir}/skin_kg_navigation_recent_normal.png`, `${dir}/skin_kg_navigation_recent_pressed.png`],
      selected: 0,
      text: '最近',
    }],
    phone: `${dir}/skin_kg_navigation_local_music_normal.png`,
    play: {
      icons: [`${dir}/skin_kg_navigation_random_normal.png`, `${dir}/skin_kg_navigation_random_pressed.png`],
      selected: 0
    },
    center_nav_icons: [{
      icons: [`${dir}/skin_kg_navigation_yueku_normal.png`, `${dir}/skin_kg_navigation_yueku_pressed.png`],
      selected: 0,
      text: '乐库',
    }, {
      icons: [`${dir}/skin_kg_navigation_channel_normal.png`, `${dir}/skin_kg_navigation_channel_pressed.png`],
      selected: 0,
      text: '电台',
    }, {
      icons: [`${dir}/skin_kg_navigation_kuchat_normal.png`, `${dir}/skin_kg_navigation_kuchat_pressed.png`],
      selected: 0,
      text: '酷群',
    }],
    earphone: `${dir}/skin_kg_navigation_tool.png`,
    game: `${dir}/skin_kg_navigation_game.png`,
    generalize: `${dir}/skin_kg_navigation_spread.png`,
    play_bg: `${dir}/skin_kg_playing_bar_right_bg.png`,
    slider_btn: `static/img/ak8.png`,
    singer_default_play_bg: `${dir}/skin_kg_playing_bar_default_avatar.png`,
    controll_play_icons: {
      icons: [`${dir}/skin_kg_ic_playing_bar_play_default.png`, `${dir}/skin_kg_ic_playing_bar_play_pressed.png`],
      selected: 0
    },
    controll_stop_icons: {
      icons: [`${dir}/skin_kg_ic_playing_bar_pause_default.png`, `${dir}/skin_kg_ic_playing_bar_pause_pressed.png`],
      selected: 0
    },
    next_icons: {
      icons: [`${dir}/skin_kg_ic_playing_bar_next_default.png`, `${dir}/skin_kg_ic_playing_bar_next_pressed.png`],
      selected: 0
    },
    song_list_icons: {
      icons: [`${dir}/skin_kg_ic_playing_bar_playlist_queue_default.png`, `${dir}/skin_kg_ic_playing_bar_playlist_queue_pressed.png`],
      selected: 0
    },
    share: 'static/img/apm.png',
    newlist: 'static/img/ap3.png',
    cycle: 'static/img/ap9.png',
    random: 'static/img/apb.png',
    singlecycle: 'static/img/ape.png',
    remove: 'static/img/apf.png',
  }
}

export const skins = [
  {
    'id': 1153,
    'themeid': 55,
    'tversion': '1.10.1',
    'title': '星夜',
    'privilege': 0,
    'package': 'http://downmobile.kugou.com/upload/theme_package/7a/7a03ce7b2468961785f1bcb832f1e57e.ks',
    'package_bk': ['http://cdn.downmobile.kugou.com/upload/theme_package/7a/7a03ce7b2468961785f1bcb832f1e57e.ks'],
    'filesize': 494801,
    'thumb': 'http://imge.kugou.com/v2/mobile_class_banner/100/T1NSx9BQDv1RCvBVdK.jpg',
    'preview': ['http://imge.kugou.com/v2/mobile_class_banner/100/T16IA9B4Eg1RCvBVdK.jpg', 'http://imge.kugou.com/v2/mobile_class_banner/100/T1lwD9B4Jv1RCvBVdK.jpg'],
    'extra': null,
    'use_total': 11099567,
    'new_time': '2017-07-17 11:06:13'
  },
  {
    'id': 1127,
    'themeid': 99,
    'tversion': '1.10.0',
    'title': '我是树懒',
    'privilege': 0,
    'package': 'http://downmobile.kugou.com/upload/theme_package/c9/c9e38bbd50ec6c7169a21359be49d054.ks',
    'package_bk': ['http://cdn.downmobile.kugou.com/upload/theme_package/c9/c9e38bbd50ec6c7169a21359be49d054.ks'],
    'filesize': 488677,
    'thumb': 'http://imge.kugou.com/v2/mobile_class_banner/100/T1KeZ9BvWT1RCvBVdK.jpg',
    'preview': ['http://imge.kugou.com/v2/mobile_class_banner/100/T1ZTd9BgKT1RCvBVdK.jpg', 'http://imge.kugou.com/v2/mobile_class_banner/100/T1bPb9BXC_1RCvBVdK.jpg'],
    'extra': null,
    'use_total': 4417395,
    'new_time': '2017-06-26 13:54:57'
  },
  {
    'id': 1147,
    'themeid': 13,
    'tversion': '1.10.0',
    'title': '迷鹿',
    'privilege': 0,
    'package': 'http://downmobile.kugou.com/upload/theme_package/0c/0c420c8e93cb571c2704136919fc0876.ks',
    'package_bk': ['http://cdn.downmobile.kugou.com/upload/theme_package/0c/0c420c8e93cb571c2704136919fc0876.ks'],
    'filesize': 406547,
    'thumb': 'http://imge.kugou.com/v2/mobile_class_banner/100/T1ceJ9Bj_v1RCvBVdK.jpg',
    'preview': ['http://imge.kugou.com/v2/mobile_class_banner/100/T18wD9BCxv1RCvBVdK.jpg', 'http://imge.kugou.com/v2/mobile_class_banner/100/T1AIV9BKbg1RCvBVdK.jpg'],
    'extra': null,
    'use_total': 5364108,
    'new_time': '2017-07-16 10:52:43'
  }
]

export default getSkin
