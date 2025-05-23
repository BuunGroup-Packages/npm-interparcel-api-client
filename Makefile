install:
	npm install

build:
	npm run build

test:
	npm test

lint:
	npm run lint

format:
	npm run format

format-check:
	npm run format -- --check

check: lint format-check build test 