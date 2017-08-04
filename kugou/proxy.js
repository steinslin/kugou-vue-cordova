var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var cfg = require('./src/config/server.js')
const apis = {
    getSong: 'http://www.kugou.com/yy/index.php?r=play/getdata',
    searchSong: 'http://songsearch.kugou.com/song_search_v2?',
}
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/api/getSong', function(req, res) {
    console.log('getSong');
    request(`${apis.getSong}&hash=${req.query.hash}&album_id=${req.query.album_id}`, function(err, _res, body) {
        if (!err && _res.statusCode == 200) {
            res.send(body);
        } else {
            console.log(err);
        }
    })
})

app.get('/api/searchSong', function(req, res) {
    console.log('searchSong');
    let url = `${apis.searchSong}keyword=${encodeURI(req.query.keyword)}&page=${req.query.page}&pagesize=${req.query.pagesize}`;
    console.log(url);
    request(url, function(err, _res, body) {
        if (!err && _res.statusCode == 200) {
            console.log(1);
            res.send(body);
        } else {
            console.log(err);
        }
    })
})

app.listen(cfg.port, cfg.host, function() {
    console.log(`proxy server listening at ${cfg.host}:${cfg.port}`)
});