// const server = 'http://localhost:3000';
// const host = '116.196.71.32'
const host = '192.168.1.104'
// const host = require('quick-local-ip').getLocalIP4()
const port = 3000
const config = {
  apis: {
    getSong: `http://${host}:${port}/api/getSong`,
    searchSong: `http://${host}:${port}/api/searchSong`,
    getTheme: `http://${host}:${port}/api/getTheme`
  },
  host,
  port
}
console.log(host)
module.exports = config
