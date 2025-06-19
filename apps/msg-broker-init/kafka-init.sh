#!/bin/sh
set -e

# Create topics if they do not exist
/opt/kafka/bin/kafka-topics.sh \
  --create \
  --if-not-exists \
  --bootstrap-server "$KAFKA_BOOTSTRAP_SERVER" \
  --replication-factor 1 \
  --partitions 1 \
  --topic domain-check-results
/opt/kafka/bin/kafka-topics.sh \
  --create \
  --if-not-exists \
  --bootstrap-server "$KAFKA_BOOTSTRAP_SERVER" \
  --replication-factor 1 \
  --partitions 1 \
  --topic domain-check-requests
