.DEFAULT_GOAL := run

run:
	@python3 -m http.server 8000

validate:
	@./bin/check_json_keys.sh