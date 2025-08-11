import serial
import time
import re
import requests

port = '/dev/cu.usbserial-0001' 
baud_rate = 115200

api_url = 'http://localhost:8080/api/monitor'  

def post_data(spo2, bpm):
    try:
        response = requests.post(f"{api_url}/{spo2}/{bpm}")
        if response.status_code == 200:
            print("Data posted successfully")
        else:
            print(f"Failed to post data. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error posting data: {e}")

try:
    with serial.Serial(port, baud_rate, timeout=1) as ser:
        print(f"Serial port {port} opened successfully")
        
        time.sleep(2)
        spo2 = None
        heart_beat = None
        last_post_time = time.time()
        
        try:
            while True:
                if ser.in_waiting > 0:
                    line = ser.readline().decode('utf-8').rstrip()
                    # print(line) 

                    # Extract SpO2 value
                    spo2_match = re.search(r'SpO2: (\d+)', line)
                    if spo2_match:
                        spo2 = float(spo2_match.group(1))
                        print(f'SpO2: {spo2}%')

                    # Extract Heart Beat value
                    heart_beat_match = re.search(r'Heart Beat: (\d+\.\d+)', line)
                    if heart_beat_match:
                        heart_beat = float(heart_beat_match.group(1))
                        print(f'Heart Beat: {heart_beat}')
                
                # Post data to API every 1 second
                current_time = time.time()
                if spo2 is not None and heart_beat is not None and (current_time - last_post_time >= 1):
                    post_data(spo2, heart_beat)
                    last_post_time = current_time
                
                # Small sleep to avoid excessive CPU usage in the loop
                time.sleep(0.1)
        
        except KeyboardInterrupt:
            print("Program stopped by user")

except serial.SerialException as e:
    print(f"Error opening serial port: {e}")

except Exception as e:
    print(f"An error occurred: {e}")
