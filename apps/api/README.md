# Domain Check API

A RESTful API for managing and checking domain records, built with [NestJS](https://nestjs.com/).

## Local Development Setup

### 1. Install dependencies

Change working directory to `apps/api` and run:

```bash
pnpm install
```

### 2. Set up environment variables

Copy the file `.env.example` in `apps/api/` to `.env` and update its content:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=testadmin
DB_PASSWORD=test12345
DB_DATABASE=testdb
NODE_ENV=development
JWT_SECRET=abcd
KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=api-app
KAFKA_GROUP_ID=api-app
```

> **Note:** You need a running PostgreSQL and Kafka instance locally, or use Docker Compose for dependencies and run only the API locally.

### 3. Run the API locally

Change working directory to `apps/api` and run:

```bash
pnpm run dev
```

### 4. Run unit tests

Change working directory to `apps/api` and run:

```bash
pnpm run test
```

## Accessing the API Documentation

After starting the API server (locally or via Docker Compose), open:

- [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

This provides interactive Swagger documentation for all endpoints, request/response schemas, and authentication requirements.
