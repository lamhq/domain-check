import json
from confluent_kafka import Consumer, Producer, KafkaError
from utils import validate_domain_records


def main():
    consumer = Consumer(
        {
            "bootstrap.servers": "localhost:9092",
            "group.id": "validator-consumer-group",
            "auto.offset.reset": "earliest",
        }
    )
    producer = Producer({"bootstrap.servers": "localhost:9092"})
    producer_topic = "domain-check-results"
    consumer_topic = "domain-check-requests"
    consumer.subscribe([consumer_topic])

    try:
        while True:
            # Poll for messages
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue

            if msg.error() and msg.error().code() != KafkaError._PARTITION_EOF:
                print(f"Error: {msg.error()}")
                break

            # Process message
            message_data = json.loads(msg.value().decode("utf-8"))
            print(f"Received message: {message_data}")
            domain = message_data.get("body", {}).get("domain")
            if not domain:
                print(f"Error: No domain found in message: {message_data}")
                continue
            result = validate_domain_records(domain)

            # Return validation result by publishing to result topic
            producer.produce(producer_topic, json.dumps(result).encode("utf-8"))
            producer.flush()
            print(f"Publish validation result: {result}")

    except KeyboardInterrupt:
        print("Shutting down...")
    finally:
        # Clean up
        consumer.close()
        producer.flush()  # Ensure all messages are sent


if __name__ == "__main__":
    main()
