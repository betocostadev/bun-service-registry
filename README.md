# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

### Docker Container

This application can be run in a docker container.

Build the Container:

```
docker build --pull -t bun-service-registry .
```

Run:

```
docker run -d -p 3000:3000 bun-service-registry
```
