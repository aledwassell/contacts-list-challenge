# Aled's Address Book

## Running the server code

You will need to install `go get go.mongodb.org/mongo-driver` and `github.com/gorilla/mux` to the run the server.
You will need to have mongodb installed and run `mongod`.
cd into the server directory and run `go run main.go`.

## Development server (Angular web app only)

Run `npm run start` this will run the app with the proxy settings e.g. `http://localhost:8080` makse sure to set SERVER_URL to '' then navigate to `http://localhost:4200/`.

## Build the Electron app

Run `npm run electron-build` to build the Electron app. Then run `npm run electron` to start the app.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
