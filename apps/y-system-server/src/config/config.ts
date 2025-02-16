const Y_SERVER_PORT = 9000
const Y_CLIENT_PORT = 5174

export const AppConfig = {

	httpContextKeys: {
		User: 'User',
		RequestId: 'RequestId',
	},
	headers: {
		requestId: 'y-system-request-id',
	},
	routes: {
		images: {
			uploadImage: '/v1/images',
			getImage: '/v1/images/:imageID',
		},
	},
	ports: {
		ySestemServer: Y_SERVER_PORT,
		ySestemClient: Y_CLIENT_PORT,
	},
	urls:{
		ySestemServer: `localhost:${Y_SERVER_PORT}`,
        ySestemClient: `localhost:${Y_CLIENT_PORT}`,
	}
} as const;
