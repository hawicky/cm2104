const express = require('express');

const authRouter = function (users) {

  const router = express.Router();

  router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username.length || !password.length) {
      res.status(400);
      res.json({ status: 400, message: "Fill all fields please." });
    }

    users.findOne({username})
      .then(doc => {
        if (doc.password !== password) {
          throw new Error();
        } else {
          delete doc.password;
          res.json({status: 200, user: doc})
        }
      })
      .catch(err => {
        res.status(401);
        res.json({status: 401, message: "Incorrect Username or Password"})
      })
  })

  router.post('/signup', (req, res) => {
    const newUser = req.body;

    if (!newUser.username.length || !newUser.password.length || !newUser.favouriteAsteroid.length) {
      res.status(400);
      res.json({ status: 400, message: "Fill all fields please." });
    }

    users.insertOne(newUser)
      .then(result => {
        res.json(result.ops[0]);
      });
  });

  return router;

};

module.exports = authRouter;
