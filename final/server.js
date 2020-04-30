const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
const parser = require('body-parser');
const templateRouter = require('./routes/templates');
const authRouter = require('./routes/auth');

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'assets')))
app.use(parser.json());
/* links mongo client */
MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('neotracker');
    const users = db.collection('users');

    app.use('/', templateRouter(users));

    app.use('/', authRouter(users));
  })

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
