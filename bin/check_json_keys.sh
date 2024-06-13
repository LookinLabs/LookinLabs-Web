#!/bin/bash

# Function to stop the spinner
stop_spinner() {
  if [ -z "$GITHUB_ACTIONS" ]; then
    kill $SPINNER_PID
  fi
  exit 1
}

# Handle SIGINT
trap stop_spinner SIGINT

# Extract JSON keys from each file
extract_json_keys() {
  cat $1 | cut -d '"' -f2 | sed -n 's/{//g; s/}//g; /./p'
}

JSON_KEYS_EE=$(extract_json_keys resources/translations/ee.json)
JSON_KEYS_EN=$(extract_json_keys resources/translations/en.json)
JSON_KEYS_RU=$(extract_json_keys resources/translations/ru.json)

# Combine and sort all keys
JSON_KEYS_ALL=$(echo "$JSON_KEYS_EE $JSON_KEYS_EN $JSON_KEYS_RU" | tr ' ' '\n' | sort | uniq)

# Print the static message
echo -n "Validating keys..."

# Start the spinner in the background
if [ -z "$GITHUB_ACTIONS" ]; then
  (
    spinner="/|\\-/|\\-"
    while true
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
fi

# Initialize validation report
echo "" > validation_report.log

# Validate JSON Keys
for key in $JSON_KEYS_ALL
do
  echo "Validating whether the key $key is used..." >> validation_report.log
  if ! grep -qw $key index.html resources/*/*.html
  then
    # Check which JSON file(s) the key is in
    key_in_files=""
    for file in resources/translations/ee.json resources/translations/ru.json resources/translations/en.json
    do
      if grep -qw $key $file; then
        key_in_files+=" $file"
      fi
    done

    echo "Key $key not found in index.html or join-us.html. Remove it from$key_in_files" >> validation_report.log
  fi
  sleep 0.23
done

# Check if any key was not found
KEY_NOT_FOUND=0
while read -r line
do
    echo -ne "\n$line"
    KEY_NOT_FOUND=1
done < <(grep 'not found' validation_report.log)

# If any key was not found, stop the spinner and exit
if [ $KEY_NOT_FOUND -eq 1 ]; then
    echo -ne "\nValidation failed."
    stop_spinner
    exit 1
fi

echo -ne "\nValidation complete."

# Stop the spinner
if [ -z "$GITHUB_ACTIONS" ]; then
  kill $SPINNER_PID
fi