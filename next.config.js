module.exports = {
	output: 'standalone',
	distDir: 'build',
	webpack: (config, { isServer }) => {
		
		if (!isServer) {
			// don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
			config.resolve.fallback = {
				fs: false,
				path: false,
				"fs-extra": false,
				net: "empty",
				tls: "empty",
				mysql2: false,
				mysql: "empty"
			}
		}

		return config
	},
}
