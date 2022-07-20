const CONFIG = {
	// 开发环境配置
	development: {
		baseUrl: 'http://127.0.0.1:18217',
	},
	// 生产环境配置
	production: {
		baseUrl: 'https://irx.rjxh.cloud',
	}
}
export default CONFIG[process.env.NODE_ENV];
