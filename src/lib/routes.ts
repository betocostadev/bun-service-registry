import { publishersData } from './publishersData'
import { serviceName, serviceID, serviceTags } from './consulConfig'

const { publishers } = publishersData
const container = `
    display: flex;
    flex-direction: column;
    margin: 1rem;
    min-width: 300px;
    justify-content: center;
    justify-items: center;
    align-items: center;
  `
const listItem = `
    display: flex;
    justify-content: space-between;
  `

const listHeader = `
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.5rem 0;
  `

const routes = {
  home: {
    path: '/api',
    body: `
    <html lang="en">
      <head>
        <title>Bun's API</title>
      </head>
      <body>
        <h1 style="color: 'red'">Bun Service Registry</h1>
        <p>Bun service using Consul</p>
        <p>Check <a href="/api/service">service data</a></p>
      </body>
    </html>
    `,
  },

  publishers: {
    path: '/api/publishers',
    body: `
    <html lang="en">
      <head>
        <title>Publishers</title>
      </head>
      <body style="background: #ebd3b3">
      <div style="${container}">
        <h1>Publishers</h1>
        <ul style="min-width: 500px">
        <li style="${listHeader}" id="list-header">
        <span>Publisher</span>
        <span>Country</span>
        </li>
          ${publishers
            .map(
              (publisher) => `<li style="${listItem}" id="${publisher.id}">
                <span>${publisher.name}</span>
                <span>${publisher.location}</span>
                </li>`
            )
            .join('')}
        </ul>
        <div>
      </body>
    </html>
    `,
  },

  service: {
    path: '/api/service',
    body: `
    <html lang="en">
      <head>
        <title>Bun's API</title>
      </head>
      <body>
        <h1>API Services</h1>
        <p>Service: ${serviceName}</p>
        <p>ID: ${serviceID}</p>
        <p>Tags: ${serviceTags.join(', ')}</p>
        <p><a href="/api">API</a></p>
      </body>
    </html>
  `,
  },
  notFound: { path: '/404', body: 'Not found' },
}

export default routes
