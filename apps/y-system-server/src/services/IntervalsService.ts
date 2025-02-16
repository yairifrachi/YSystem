import { Server } from 'http'

const HEALTH_CHECK_INTERVAL_TIME = 10 * 1000

const intervals: ReturnType<typeof setInterval>[] = []

export const initIntervals = (server: Server, port: number) => {
	!intervals.length && intervals.push(
		setInterval(() => healthCheckInterval(server, port), HEALTH_CHECK_INTERVAL_TIME),
	)
}

export const clearIntervals = () => {
	intervals.forEach(clearInterval)
}

const healthCheckInterval = (server: Server, port: number) => {
	if (server.listening) {
		console.log({ message: `y-system-server is alive and listening on port ${port}` })
	} else {
		console.error({ message: `y-system-server is down!` })
	}
}
