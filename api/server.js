const path = require('path');
const gateway = require('express-gateway');
const morgan = require('morgan')

const {conn} = require('./db.js')
require('./microservices/users.js')  //Uncomment requires for run all the microservices
<<<<<<< HEAD
require('./microservices/email.js')
=======
require('./microservices/auth.js')
>>>>>>> 399f36004a2e2b618529c15015b27faf5b05776e

require('./microservices/accounts.js')
require('./microservices/admin.js')

conn.sync({ force: true })
.then(() => {
  gateway()
  .load(path.join(__dirname, 'config'))
  .run();
  console.log(`Connected to Database ${conn.config.database}, with user '${conn.config.username}' on port ${conn.config.port}`)
})
  