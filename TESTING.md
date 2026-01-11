# Testing the Sensor API

Here are some example requests to test your sensor API:

## 1. Health Check

```bash
curl http://localhost:3000/api/v1/health
```

Production:
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/health
```

## 2. Create Sensor Readings (POST)

### Temperature Reading
```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

Production:
```bash
curl -X POST https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Temperature Sensor",
    "sensorType": "DHT22",
    "value": 25.5,
    "unit": "°C"
  }'
```

### Humidity Reading
```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Humidity Sensor",
    "sensorType": "DHT22",
    "value": 65.2,
    "unit": "%"
  }'
```

### Light Sensor Reading
```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Light Sensor",
    "sensorType": "BH1750",
    "value": 450,
    "unit": "lux"
  }'
```

### Pressure Sensor Reading
```bash
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Content-Type: application/json" \
  -d '{
    "sensorName": "Pressure Sensor",
    "sensorType": "BMP280",
    "value": 1013.25,
    "unit": "hPa"
  }'
```

## 3. Get All Sensor Readings

```bash
curl http://localhost:3000/api/v1/sensors
```

Production:
```bash
curl https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors
```

## 4. Filter by Sensor Name

```bash
curl "http://localhost:3000/api/v1/sensors?name=Temperature%20Sensor"
```

## 5. Filter by Sensor Type

```bash
curl "http://localhost:3000/api/v1/sensors?type=DHT22"
```

## 6. Limit Results

```bash
curl "http://localhost:3000/api/v1/sensors?limit=10"
```

## 7. Get Sensor Reading by ID

```bash
curl http://localhost:3000/api/v1/sensors/1
```

## 8. Delete Sensor Reading

```bash
curl -X DELETE http://localhost:3000/api/v1/sensors/1
```

## Creating Mock Data Script

You can create a bash script to generate mock sensor data:

```bash
#!/bin/bash

API_URL="http://localhost:3000/api/v1/sensors"

# Generate random temperature data
for i in {1..20}; do
  TEMP=$(awk -v min=20 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}')
  
  curl -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{
      \"sensorName\": \"Temperature Sensor\",
      \"sensorType\": \"DHT22\",
      \"value\": $TEMP,
      \"unit\": \"°C\"
    }"
  
  sleep 1
done
```

For production:
```bash
#!/bin/bash

API_URL="https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors"

# Generate random temperature data
for i in {1..20}; do
  TEMP=$(awk -v min=20 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}')
  
  curl -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "{
      \"sensorName\": \"Temperature Sensor\",
      \"sensorType\": \"DHT22\",
      \"value\": $TEMP,
      \"unit\": \"°C\"
    }"
  
  sleep 1
done
```

Save this as `generate_mock_data.sh` and run with:
```bash
chmod +x generate_mock_data.sh
./generate_mock_data.sh
```

## Python Script for Simulating IoT Device

```python
import requests
import time
import random

API_URL = "http://localhost:3000/api/v1/sensors"
# For production: API_URL = "https://assignment-week2-sensor-api-e78v.vercel.app/api/v1/sensors"

headers = {
    "Content-Type": "application/json"
}

while True:
    # Simulate temperature
    temp = round(random.uniform(20, 30), 2)
    response = requests.post(API_URL, headers=headers, json={
        "sensorName": "Temperature Sensor",
        "sensorType": "DHT22",
        "value": temp,
        "unit": "°C"
    })
    print(f"Temperature: {temp}°C - Status: {response.status_code}")
    
    # Simulate humidity
    humidity = round(random.uniform(40, 80), 2)
    response = requests.post(API_URL, headers=headers, json={
        "sensorName": "Humidity Sensor",
        "sensorType": "DHT22",
        "value": humidity,
        "unit": "%"
    })
    print(f"Humidity: {humidity}% - Status: {response.status_code}")
    
    time.sleep(5)  # Wait 5 seconds before next reading
```

Save as `simulate_sensor.py` and run with:
```bash
python3 simulate_sensor.py
```
