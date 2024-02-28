import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

describe('Elysia', () => {
  it('return a response', async () => {
    const app = new Elysia()

    app.get(
      '/',
      () => `
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

    const response = await app
      .handle(new Request('http://localhost/'))
      .then((res) => res.text())

    expect(response).toBe(`
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
    `)
  })
})
