// const server = 'http://localhost:3000';
const host = 'localhost'
const port = 3000
const config = {
  apis: {
    getSong: `http://${host}:${port}/api/getSong`,
    searchSong: `http://${host}:${port}/api/searchSong`
  },
  host,
  port
}
module.exports = config
