const express = require('express');
const moment = require('moment');
const fetch = require('node-fetch');

const templateRouter = function (users) {

  const router = express.Router();

  router.get('/', (req, res) => {
    /* format date */
    const minDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    console.log(minDate);
/* fetching close approach data from CNEOS API and parsing the 4 pieces of data for the home page data */
    const closestApproachData = fetch('https://ssd-api.jpl.nasa.gov/cad.api?sort=date&date-min=' + minDate)
      .then(result => result.json())
      .then(apiResponse => {
        /* taking data from API respone */
        const soonestObjectData = {
          "Name of object:": apiResponse.data[0][0],
          "Time of Approach (BST):": apiResponse.data[0][3],
          "Approach Distance (km):": (parseFloat(apiResponse.data[0][4]) * 149598000).toFixed(0), /* converting astronimical units to more readable kilometers */
          "Relative Velocity (km/s):": parseFloat(apiResponse.data[0][7]).toFixed(3)
        };

        const timeOfApproach = apiResponse.data[0][3];
          /* close approach data as a tuple */
        const dataToRender = Object.entries(soonestObjectData);
/* rendering data to index page */
        res.render('templates/index', {
          dataToRender,
          timeOfApproach
        });
      })
  });
/* updating the users page - asynchronous */
  router.get('/users', (req, res) => {
    users.find({}).toArray()
      .then((docs) => {
        res.render('templates/users', {
          users: docs
        })
      });
  });

  return router;

};

module.exports = templateRouter;
