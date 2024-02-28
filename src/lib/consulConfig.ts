// Define service information
export const serviceName = 'publisher-service-api'
export const serviceID = serviceName
export const serviceTags = ['api', 'bun']

// Define health check endpoint
export const healthCheck = {
  interval: '10s',
  timeout: '5s',
  HTTP: `https://3603-179-48-184-86.ngrok-free.app:443/api/health`,
}
