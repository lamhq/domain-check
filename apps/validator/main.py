import json
import os
from confluent_kafka import Consumer, Producer, KafkaError
from utils import validate_domain_records
import logging

KAFKA_BOOTSTRAP_SERVER = os.getenv("KAFKA_BOOTSTRAP_SERVER", "localhost:9092")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)


def main():
    consumer = Consumer(
        {
            "bootstrap.servers": KAFKA_BOOTSTRAP_SERVER,
            "group.id": "validator-consumer-group",
            "auto.offset.reset": "earliest",
        }
    )
    producer = Producer({"bootstrap.servers": KAFKA_BOOTSTRAP_SERVER})
    producer_topic = "domain-check-results"
    consumer_topic = "domain-check-requests"
    consumer.subscribe([consumer_topic])
    logger.info(f"Subscribed to topic: {consumer_topic}")

    try:
        logger.info("Starting message polling loop...")
        while True:
            # Poll for messages
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue

            if msg.error() and msg.error().code() != KafkaError._PARTITION_EOF:
                logger.error(f"Kafka error: {msg.error()}")
                break

            # Process message
            try:
                message_data = json.loads(msg.value().decode("utf-8"))
            except Exception as e:
                logger.error(f"Failed to decode message: {e}")
                continue
            logger.info(f"Received message: {message_data}")
            domain = message_data.get("body", {}).get("domain")
            if not domain:
                logger.error(f"No domain found in message: {message_data}")
                continue
            logger.info(f"Validating domain: {domain}")
            result = validate_domain_records(domain)

            # Return validation result by publishing to result topic
            try:
                producer.produce(producer_topic, json.dumps(result).encode("utf-8"))
                producer.flush()
                logger.info(f"Published validation result: {result}")
            except Exception as e:
                logger.error(f"Failed to publish result: {e}")

    except KeyboardInterrupt:
        logger.info("Shutting down...")
    finally:
        # Clean up
        consumer.close()
        producer.flush()  # Ensure all messages are sent


if __name__ == "__main__":
    main()
