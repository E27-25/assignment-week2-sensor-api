"""
IoT Sensor Simulator
Simulates sensor data and sends it to the API
"""

import requests
import time
import random
from datetime import datetime

# Configuration
API_URL = "http://localhost:3000/api/v1/sensors"
API_SECRET = "your_secret_key"
INTERVAL = 5  # seconds between readings

headers = {
    "Authorization": f"Bearer {API_SECRET}",
    "Content-Type": "application/json"
}

def send_sensor_data(sensor_name, sensor_type, value, unit):
    """Send sensor data to the API"""
    data = {
        "sensorName": sensor_name,
        "sensorType": sensor_type,
        "value": value,
        "unit": unit
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=data)
        if response.status_code == 201:
            print(f"✓ {sensor_name}: {value}{unit} - Status: {response.status_code}")
        else:
            print(f"✗ {sensor_name}: Error {response.status_code}")
    except Exception as e:
        print(f"✗ {sensor_name}: Connection error - {e}")

def main():
    print("🌡️  IoT Sensor Simulator Started")
    print(f"📡 API URL: {API_URL}")
    print(f"⏱️  Interval: {INTERVAL} seconds")
    print(f"🔄 Press Ctrl+C to stop\n")
    
    try:
        while True:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{timestamp}]")
            
            # Simulate temperature (20-30°C with some variation)
            temp = round(random.uniform(20, 30), 2)
            send_sensor_data("Temperature Sensor", "DHT22", temp, "°C")
            
            # Simulate humidity (40-80% with some variation)
            humidity = round(random.uniform(40, 80), 2)
            send_sensor_data("Humidity Sensor", "DHT22", humidity, "%")
            
            # Simulate light (100-1000 lux)
            light = round(random.uniform(100, 1000), 0)
            send_sensor_data("Light Sensor", "BH1750", light, "lux")
            
            # Simulate pressure (1000-1020 hPa)
            pressure = round(random.uniform(1000, 1020), 2)
            send_sensor_data("Pressure Sensor", "BMP280", pressure, "hPa")
            
            print("")
            time.sleep(INTERVAL)
            
    except KeyboardInterrupt:
        print("\n\n👋 Sensor simulator stopped")

if __name__ == "__main__":
    main()
