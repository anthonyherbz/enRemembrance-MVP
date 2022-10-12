module.exports = {
	webpack: (config, { isServer }) => {
		
		if (!isServer) {
			// don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
			config.resolve.fallback = {
				fs: false,
				path: false,
				"fs-extra": false,
				net: "empty",
				tls: "empty",
				mysql2: "empty"
			}
		}

		return config
	},
}
