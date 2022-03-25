# Dating-App

## Dependencies

In the project root use `npm install` to install all dependencies. The `package.json` file in the root has a script to install dependencies for both the api and the client, so you only need to run the installation once.

# API Setup

## Create the DB

use `psql -U development` to log in to the PostgeSQL server with username `development` and password `development` (if you are not M1, this command **must** be run in vagrant terminal).

create the database with the command `CREATE DATABASE dating_development;`.

Copy the .env.example file to .env.development and fill in the necessary PostgreSQL configuration.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=dating_development
PGPASSWORD=development
PGPORT=5432
```

## Creating the database tables

In the root of the project you can create all the tables and seed them with fake data with

```
npm run resetdb
```

You can run this command anytime to full reset the database tables. Remember this will generate entirely new seed data.

## Run the server

In the root of the project run the api with

```
npm run api
```

In the root of the project run the client with

```
npm run client
```

Test Change
