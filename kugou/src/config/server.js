const server = 'http://172.30.67.162:3000';
const config = {
	host: 'http://172.30.67.162',
	port: 3000,
	apis: {
		getSong: `${server}/api/getSong`,
		searchSong: `${server}/api/searchSong`
	}
}
module.exports = config