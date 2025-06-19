#!/bin/sh
set -e

# Wait for Kafka topics to be created
sleep 5

# Run migrations
pnpm run migrate-prod

# Start the application
exec pnpm start