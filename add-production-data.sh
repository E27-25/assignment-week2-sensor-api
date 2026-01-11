#!/bin/bash

# Add Sensor Data to Production API
# Run this script after your API is successfully deployed

API_URL="https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors"

echo "🚀 Adding sensor data to production API..."
echo "API URL: $API_URL"
echo ""

# Test API health first
echo "Testing API health..."
HEALTH_RESPONSE=$(curl -s "${API_URL/sensors/health}")
echo "Health check: $HEALTH_RESPONSE"
echo ""

if [[ $HEALTH_RESPONSE == *"ok"* ]]; then
    echo "✅ API is healthy! Adding sensor data..."
    echo ""
else
    echo "❌ API health check failed. Please fix deployment first."
    echo "See URGENT_FIX_VERCEL.md for instructions."
    exit 1
fi

# Add Temperature readings
echo "📊 Adding Temperature readings..."
for i in {1..15}; do
  TEMP=$(awk -v min=20 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}')
  RESPONSE=$(curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Temperature Sensor\",\"sensorType\":\"DHT22\",\"value\":$TEMP,\"unit\":\"°C\"}")
  
  if [[ $RESPONSE == *"success"* ]]; then
    echo "  ✓ Temperature reading $i: ${TEMP}°C"
  else
    echo "  ✗ Failed to add reading $i: $RESPONSE"
  fi
  sleep 1
done

echo ""

# Add Humidity readings
echo "💧 Adding Humidity readings..."
for i in {1..15}; do
  HUMIDITY=$(awk -v min=40 -v max=80 'BEGIN{srand(); print min+rand()*(max-min)}')
  RESPONSE=$(curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Humidity Sensor\",\"sensorType\":\"DHT22\",\"value\":$HUMIDITY,\"unit\":\"%\"}")
  
  if [[ $RESPONSE == *"success"* ]]; then
    echo "  ✓ Humidity reading $i: ${HUMIDITY}%"
  else
    echo "  ✗ Failed to add reading $i: $RESPONSE"
  fi
  sleep 1
done

echo ""

# Add Light readings
echo "💡 Adding Light readings..."
for i in {1..10}; do
  LIGHT=$(awk -v min=200 -v max=800 'BEGIN{srand(); print int(min+rand()*(max-min))}')
  RESPONSE=$(curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Light Sensor\",\"sensorType\":\"BH1750\",\"value\":$LIGHT,\"unit\":\"lux\"}")
  
  if [[ $RESPONSE == *"success"* ]]; then
    echo "  ✓ Light reading $i: ${LIGHT} lux"
  else
    echo "  ✗ Failed to add reading $i: $RESPONSE"
  fi
  sleep 1
done

echo ""

# Add Pressure readings
echo "🌡️  Adding Pressure readings..."
for i in {1..10}; do
  PRESSURE=$(awk -v min=1000 -v max=1020 'BEGIN{srand(); print min+rand()*(max-min)}')
  RESPONSE=$(curl -s -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{\"sensorName\":\"Pressure Sensor\",\"sensorType\":\"BMP280\",\"value\":$PRESSURE,\"unit\":\"hPa\"}")
  
  if [[ $RESPONSE == *"success"* ]]; then
    echo "  ✓ Pressure reading $i: ${PRESSURE} hPa"
  else
    echo "  ✗ Failed to add reading $i: $RESPONSE"
  fi
  sleep 1
done

echo ""
echo "✅ Done! Added 50 sensor readings to the API."
echo ""
echo "View all readings:"
echo "curl ${API_URL}?limit=50"
echo ""
echo "Or visit your webapp to see the data in chart form!"
