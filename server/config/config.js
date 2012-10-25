module.exports = function(){
	return {
		host: {
			baseUrl	: 'http://font.antaranian.com/',
			static	: 'http://static.font.antaranian.com/',
			name	: 'font.antaranian.com',
			port	: 8080
		},
		dirs: {
			static	: '/home/antaranian/Current/Font/static/'
		},
		riak: {
			host	: '127.0.0.1',
			port	: 8098
		}
	};
};