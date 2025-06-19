# Domain Check

A full-stack web application that enables users to log in and test their domain names for common email security configuration issues.

## Requirements

- [Docker](https://www.docker.com/get-started) (v28+ recommended)
- [Docker Compose](https://docs.docker.com/compose/) (v2.35+ recommended)

## Run and test the application

### 1. Clone the repository

```bash
git clone <repo-url>
cd mono-tpl
```

### 2. Start all services

```bash
docker compose up
```

- The web app will be available at [http://localhost:3001](http://localhost:3001)
- The API app will be available at [http://localhost:3000](http://localhost:3000)
- The database (Postgres) will run at port 5432
- The message broker (Kafka) will run at port 9092
- The Python script that perform domain checking will run on the background
- The API documentation (Swagger UI) will be available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## System Architecture

The system is composed of several services:

- **Web App**: A React SPA web for end-users.
- **API App**: A NestJS backend that provides functionalities for the web.
- **Database**: a PostgreSQL database for storing user data and domain check history.
- **Message Broker**: enables asynchronous, decoupled communication between the API app and the **validator**.
- **Validator**: A Python script that listen for domain check requests from the message broker, performs validation, and publishes results back.

### How it work?

1. The user accesses the web app and performs domain checking.
2. The API handles requests from the web app. When a domain check is requested, the API publishes a message to the message broker.
3. The validator service consumes these messages, performs the necessary checks, and publishes the results back to the message broker.
4. The API then consumes the validation result and updates the domain status.

This architecture allows each service to scale independently, improves fault tolerance, and enables easy extension (e.g., adding more validators or API instances).
