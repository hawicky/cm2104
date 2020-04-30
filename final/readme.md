# Installation and Running Steps

## Installation
Firstly please ensure you have the following installed:
  - Node
  - NPM
  - MongoDB

Please also ensure you have MongoDB running on `mongodb://localhost:27017`.

## Running
  - Run `npm install` in the prototype or final folder to install dependencies.
  - Run `npm run seed` to add two seed users to the database:
```json
  {
    "username": "aiden",
    "password": "test1",
    "favouriteAsteroid": "Some asteroid"
  },
  {
    "username": "lewis",
    "password": "test2",
    "favouriteAsteroid": "Another asteroid"
  }
```
  - Run `npm start` to run the server.
    - Alternatively run `npm run start:dev` to run the server with hot-reloading.
  - Navigate to `http://localhost:3000`
