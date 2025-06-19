# Domain Check Validator

A Python service for validating domain records (SPF, DKIM, DMARC).

## Requirements

- Python >=3.9.6

## Local Development Setup

### 1. Install dependencies

Change working directory to `apps/validator` and run:

```bash
pip install -r requirements.txt
```

### 2. Set up environment variables

Set the following environment variable (or export it in your shell):

```
KAFKA_BOOTSTRAP_SERVER=localhost:9092
```

> **Note:** The default is `localhost:9092` if not set.

### 3. Run the validator service

Change working directory to `apps/validator` and run:

```bash
python main.py
```

The service will listen to the `domain-check-requests` Kafka topic and publish results to the `domain-check-results` topic.

### 4. Run unit tests

Change working directory to `apps/validator` and run:

```bash
pytest -svv test_validate_domain_records.py
```

## Kafka Topics

- **domain-check-requests**: Incoming domain validation requests (expects JSON with a `body.domain` field)
- **domain-check-results**: Outgoing validation results (JSON)

## Project Structure

- `main.py` — Main entry point, Kafka consumer/producer logic
- `utils.py` — Domain validation logic (SPF, DKIM, DMARC)
- `test_validate_domain_records.py` — Unit tests for domain validation
- `requirements.txt` — Python dependencies
