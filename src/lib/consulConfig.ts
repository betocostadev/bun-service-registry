// Define service information
export const serviceName = 'publisher-service-api'
export const serviceID = serviceName
export const serviceTags = ['api', 'bun']

// Define health check endpoint
export const healthCheck = {
  interval: '10s', // Check interval
  timeout: '5s', // Check timeout
  HTTP: `https://aec1-179-48-184-86.ngrok-free.app:443/api/health`, // Replace with your health check endpoint URL
}
