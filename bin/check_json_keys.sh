#!/bin/bash

# Function to stop the spinner
stop_spinner() {
  kill $SPINNER_PID
  exit 1
}

# Handle SIGINT
trap stop_spinner SIGINT

JSON_KEYS_EE=$(cat resources/translations/ee.json | cut -d '"' -f2 | sed -n 's/{//g; s/}//g; /./p')
JSON_KEYS_EN=$(cat resources/translations/en.json | cut -d '"' -f2 | sed -n 's/{//g; s/}//g; /./p')
JSON_KEYS_RU=$(cat resources/translations/ru.json | cut -d '"' -f2 | sed -n 's/{//g; s/}//g; /./p')

JSON_KEYS_ALL=$(echo "$JSON_KEYS_EE $JSON_KEYS_EN $JSON_KEYS_RU" | tr ' ' '\n' | sort | uniq)

# Print the static message
echo -n "Validating keys..."

# Start the spinner in the background
(
  spinner="/|\\-/|\\-"
  while :
  do
    for i in `seq 0 7`
    do
      echo -ne "\r\033[K"  # Move to the beginning of the line and clear it
      echo -n "Validating keys..."
      echo -n "${spinner:$i:1}"
      sleep 0.1
    done
  done
) & # Send the spinner to the background
SPINNER_PID=$!

# Validate JSON Keys
echo "" > validation_report.log
# Run your loop
for key in $JSON_KEYS_ALL
do
  echo "Validating whether the key $key is used..." >> validation_report.log
  if ! grep -q $key index.html resources/*/*.html
  then
    echo "Key $key not found in index.html or join-us.html" >> validation_report.log
  fi
  sleep 0.23
done

KEY_NOT_FOUND=0
while read -r line
do
    echo -ne "\n$line"
    KEY_NOT_FOUND=1
done < <(grep 'not found' validation_report.log)

if [ $KEY_NOT_FOUND -eq 1 ]; then
    echo -ne "\nValidation failed."
    stop_spinner
    exit 1
fi

echo -ne "\nValidation complete."

# Stop the spinner
kill $SPINNER_PID