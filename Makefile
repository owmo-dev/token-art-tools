run-server:
	gatsby develop

build:
	gatsby build

serve: build
	gatsby serve

deploy:
	npm run deploy
