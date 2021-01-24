const path = require('path');
const gateway = require('express-gateway');
const {conn} = require('./db.js')
require('./microservices/test.js')
require('./microservices/users.js')  //Uncomment requires for run all the microservices


conn.sync({ force: false }).then(() => {
  gateway()
  .load(path.join(__dirname, 'config'))
  .run();
})
