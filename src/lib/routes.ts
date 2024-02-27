const routes = {
  home: {
    path: '/api',
    body: `<html lang="en">
  <head>
    <title>Bun's API</title>
  </head>
  <body>
    <h1 style="color: 'red'">Bun Service Registry</h1>
    <p>Bun service using Consul</p>
    <p>Check <a href="/api/service">service data</a></p>
  </body>
</html>`,
  },
  notFound: { path: '/404', body: 'Not found' },
}

export default routes
