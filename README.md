# Aled's Contacts Address Book

## Running the server code

You will need to install `go get go.mongodb.org/mongo-driver` and `github.com/gorilla/mux` to the run the server.

You will need to have mongodb installed and run `mongod`.

cd into the server directory and run `go run main.go`.

## Development server(Angular web app only)

Run `npm run start` this will run the app with the proxy settings e.g. `http://localhost:8080` make sure to set `const SERVER_URL = ''` in core.service.ts then navigate to `http://localhost:4200/`.

## Build the Electron app

Run `npm run electron-build` to build the Electron app.

Then run `npm run electron` to start the app.

## Running unit tests

You will need to set `const SERVER_URL = ''` in core.service.ts to run the tests.

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Shortcomings

## Server(server/main.go)

I haven't written the unit tests for the server, but it should be tested for production code.

When creating a new contact the server should check if the required fields first_name and last_name have been populated, if not it should throw an error.
Otherwise if the client could send empty contacts then we could potentially end up with loads of contacts in the database and you wouldn't actually be able to see them from the front end.

The CORS Middleware function can be removed from within main.go for production, I don't think Electron cares about Cross-Origin Resource Sharing.

## Angular App

I should remove \_id from the Contact class in core.service.ts and contact class could extend the Contact struct on the backend, I think this would be cleaner as \_id will only ever be set on the backend.

address-form.component should have unit tests, preferably testing from an action within the template. E.g. `fixture.debugElement.query('...').click();`

I could have used the [Angular Material Table ](https://material.angular.io/components/table/overview#table-basic) to diplay the contacts, it has built in sorting, filtering and pagination functionality.

I would have liked to have added more validation on the add contact form, E.g. phone number validation.
