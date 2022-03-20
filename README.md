# Dating-App

## Dependencies

In the project root use `npm install` to install all dependencies. The `package.json` file in the root has a script to install dependencies for both the api and the client, so you only need to run the installation once.

# API Setup

## Create the DB

use `psql -U development` to log in to the PostgeSQL server with username `development` and password `development` (if you are not M1, this command **must** be run in vagrant terminal).

create the database with the command `CREATE DATABASE dating_database;`.

Copy the .env.example file to .env.development and fill in the necessary PostgreSQL configuration.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=dating_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding the server

TBA

## Run the server

In the root of the project run the api with

```
npm run api
```

In the root of the project run the client with

```
npm run client
```
