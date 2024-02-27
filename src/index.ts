import { Elysia } from 'elysia'
// import routes from './lib/routes'
import { html } from '@elysiajs/html'
import consul from 'consul'
import routes from './lib/routes'

const app = new Elysia()

const port = 3000 // You can change this port
const ngrokHost = 'aec1-179-48-184-86.ngrok-free.app'

const consulClient = new consul({
  host: 'consul.jeffs.dev', // Replace with your Consul agent address
  port: '4433',
  secure: true,
})

// Define service information
const serviceName = 'beto-api'
const serviceID = serviceName
const serviceTags = ['api', 'bun']

// Define health check endpoint
const healthCheck = {
  interval: '10s', // Check interval
  timeout: '5s', // Check timeout
  HTTP: `https://aec1-179-48-184-86.ngrok-free.app:443/api/health`, // Replace with your health check endpoint URL
}

// Register the service with Consul
consulClient.agent.service
  .register({
    id: serviceID,
    name: serviceName,
    tags: serviceTags,
    address: ngrokHost,
    port: 443,
    check: healthCheck,
  })
  .then(() => {
    console.log(`Service '${serviceName}' registered with ID '${serviceID}'`)
  })
  .catch((err) => {
    console.error('Error registering service:', err)
  })

// Deregister the service when the process exits (optional)
process.on('SIGINT', () => {
  consulClient.agent.service
    .deregister(serviceID)
    .then(() => console.log('Service deregistered'))
    .catch((err) => console.error('Error deregistering service:', err))
  process.exit()
})

app.use(html()).get(routes.home.path, () => routes.home.body)

app.get(
  '/api/service',
  () =>
    `<html lang="en">
    <head>
      <title>Bun's API</title>
    </head>
    <body>
      <h1>API Services</h1>
      <p>Service: ${serviceName}</p>
      <p>ID: ${serviceID}</p>
      <p>Tags: ${serviceTags.join(', ')}</p>
      <p><a href="/api">Home</a></p>
    </body>
  </html>`
)

app.get('/api/health', () => {
  return {
    status: 'ok',
  }
})

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)
})

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
