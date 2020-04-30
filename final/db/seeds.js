const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017')
  .then(async (client) => {
    const db = client.db('neotracker');
    const users = db.collection('users');

    await users.deleteMany({});
/* inserting 2x examples of data */
    await users.insertMany([
      {
        username: "aiden",
        password: "test1",
        favouriteAsteroid: "Some rock"
      },
      {
        username: "lewis",
        password: "test2",
        favouriteAsteroid: "Another rock"
      }
    ]);
/* closing connection so it doesn't hang/stay open */
    client.close()
  })