#!/bin/bash

# Mock Data Generator for Sensor API
# This script generates random sensor data and sends it to the API

API_URL="http://localhost:3000/api/v1/sensors"
API_SECRET="demo_secret_key_12345"

echo "Starting mock data generation..."
echo "API URL: $API_URL"
echo ""

# Function to generate random float between min and max
random_float() {
  awk -v min=$1 -v max=$2 'BEGIN{srand(); print min+rand()*(max-min)}'
}

# Generate 30 sensor readings
for i in {1..30}; do
  echo "Generating reading $i/30..."
  
  # Random temperature (20-30°C)
  TEMP=$(random_float 20 30)
  TEMP=$(printf "%.2f" $TEMP)
  
  curl -s -X POST $API_URL \
    -H "Authorization: Bearer $API_SECRET" \
    -H "Content-Type: application/json" \
    -d "{
      \"sensorName\": \"Temperature Sensor\",
      \"sensorType\": \"DHT22\",
      \"value\": $TEMP,
      \"unit\": \"°C\"
    }" > /dev/null
  
  echo "  ✓ Temperature: ${TEMP}°C"
  
  # Random humidity (40-80%)
  HUMIDITY=$(random_float 40 80)
  HUMIDITY=$(printf "%.2f" $HUMIDITY)
  
  curl -s -X POST $API_URL \
    -H "Authorization: Bearer $API_SECRET" \
    -H "Content-Type: application/json" \
    -d "{
      \"sensorName\": \"Humidity Sensor\",
      \"sensorType\": \"DHT22\",
      \"value\": $HUMIDITY,
      \"unit\": \"%\"
    }" > /dev/null
  
  echo "  ✓ Humidity: ${HUMIDITY}%"
  
  # Random light (100-1000 lux)
  LIGHT=$(random_float 100 1000)
  LIGHT=$(printf "%.0f" $LIGHT)
  
  curl -s -X POST $API_URL \
    -H "Authorization: Bearer $API_SECRET" \
    -H "Content-Type: application/json" \
    -d "{
      \"sensorName\": \"Light Sensor\",
      \"sensorType\": \"BH1750\",
      \"value\": $LIGHT,
      \"unit\": \"lux\"
    }" > /dev/null
  
  echo "  ✓ Light: ${LIGHT} lux"
  echo ""
  
  # Wait 2 seconds between readings
  sleep 2
done

echo "Mock data generation complete!"
echo "Total readings created: 90 (30 temperature + 30 humidity + 30 light)"
