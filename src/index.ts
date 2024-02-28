import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import consul from 'consul'
import routes from './lib/routes'
import {
  serviceName,
  serviceID,
  serviceTags,
  healthCheck,
} from './lib/consulConfig'
import { publishersData } from './lib/publishersData'

export const app = new Elysia()

const port = 3000 // You can change this port
const ngrokHost = '3603-179-48-184-86.ngrok-free.app'

const consulClient = new consul({
  host: 'consul.jeffs.dev', // Replace with your Consul agent address
  port: '4433',
  secure: true,
})

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
  '/',
  () =>
    `
    <html lang="en">
      <head>
        <title>Bun's API</title>
      </head>
      <body>
        <h1>Welcome to Bun's Service Register API</h1>
        <p><a href="/api/health">Check Health</p>
        <p><a href="/api/service">Check Service</p>
        <p><a href="/api/publishers">Publishers</p>
      </body>
    </html>
    `
)

app.get(routes.service.path, () => routes.service.body)

app.get(routes.publishers.path, () => routes.publishers.body)
// app.get(routes.publishers.path, () => publishersData.publishers)

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
