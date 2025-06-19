# NOTE

## TODO

- [x] [web] build with docker
- [x] [api] replace hardcoded address
- [ ] [api] run migration on starting Docker
- [ ] [api] build with docker
- [ ] [validator] build with docker
- [ ] [global] create `docker-compose` file to test the whole system
- [ ] [global] create two kafka topics when starting with docker compose
- [ ] [api] update `README.md`
- [ ] [web] update `README.md`
- [ ] [validator] update `README.md`
- [ ] [global] update `README.md` (system architecture)
- [ ] [web] fix issue reading localStorage key `user`
- [ ] [api] fix typeorm config of `entities`
- [ ] [web] reload domain list when item changed in database
- [ ] [validator] Validate DKIM
- [ ] [web] unit test
- [ ] [api] unit test
- [ ] [web] implement CI to run test on Github Action
- [ ] [api] implement CI to run test on Github Action
- [ ] [validator] implement CI to run test on Github Action
- [ ] [web] fix responsive issue of signin page
- [ ] [web] review `sx` declaration in `DomainFormView`

### Web base source code

- [x] code linter (eslint): typescript, react, unit test
- [x] formatter (prettier): typescript, react
- [x] commit lint (husky) + lint-staged: lint files before commit
- [x] vs code setting
- [x] storybook
- [x] routing
- [x] mock network requests for storybook
- [x] form handling (React Hook Form)
- [x] http client (TanStack Query)
- [x] API error handling
- [ ] unit test (jest)
- [ ] e2e test (playwright)

### API base source code

- [x] API framework (NestJS)
- [x] linter (eslint): typescript, nodejs, unit test
- [x] formatter (prettier): typescript
- [x] automated API doc (swagger)
- [ ] request validate
- [ ] response transforming
- [ ] error response format

## Snippets

### Postgres

```sh
docker run --rm --name postgres-13.3 \
  -p 5432:5432 \
  -e POSTGRES_USER=testadmin \
  -e POSTGRES_PASSWORD=test12345 \
  -e POSTGRES_DB=testdb \
  -v test-db:/var/lib/postgresql/data \
  postgres:13.3
```

### Kafka

```sh
docker run --rm --name kafka \
  -p 9092:9092 \
  -e KAFKA_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://host.docker.internal:9092 \
  -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
  -e KAFKA_NODE_ID=1 \
  -e KAFKA_PROCESS_ROLES=broker,controller \
  -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 \
  -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 \
  -e KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS=0 \
  -e KAFKA_NUM_PARTITIONS=3 \
  apache/kafka:latest

docker exec --workdir /opt/kafka/bin/ -i kafka sh -c "\
  ./kafka-topics.sh --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic domain-check-results"
docker exec --workdir /opt/kafka/bin/ -i kafka sh -c "\
  ./kafka-topics.sh --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic domain-check-requests"


docker exec --workdir /opt/kafka/bin/ -it kafka sh
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic validate-domain-topic --from-beginning

# -e KAFKA_AUTO_CREATE_TOPICS_ENABLE=true \
#   -e KAFKA_CREATE_TOPICS="domain-check-results:1:1,domain-check-requests:1:1:compact" \
```

### Web

```sh
# Build the image
docker build . --target web --tag web-app:latest

# Run the container with API URL
docker run --name web-app --rm -p 3001:80 -e API_URL=http://host.docker.internal:3000 web-app
```

Debug:

```sh
docker build --target build -t dapi-app .
docker run --rm -it api-app sh
```

### API

```sh
# Build the image
docker build . --target api --tag api-app:latest

# Run the container with API URL
docker run --name api-app --rm -p 3000:3000 \
  -e PORT=3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USERNAME=testadmin \
  -e DB_PASSWORD=test12345 \
  -e DB_DATABASE=testdb \
  -e NODE_ENV=production \
  -e JWT_SECRET=abcd \
  -e KAFKA_BROKER=host.docker.internal:9092 \
  -e KAFKA_CLIENT_ID=api-app \
  -e KAFKA_GROUP_ID=api-app \
  api-app
```

### Migration

```sh
pnpm run migrate
pnpm run typeorm migration:create ./migrations/add-test-user
pnpm run typeorm migration:revert -d ./src/data-source.ts
```

### Validator

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
pip show checkdmarc
pip show validators
pip show confluent_kafka
```
