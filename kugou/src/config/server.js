// const server = 'http://localhost:3000';
const host = '192.168.0.3'
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
