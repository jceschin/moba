require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mobadb`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  User,
  Account,
  Transaction,
  Blacklist,
  Contact,
  ContactUser,
} = sequelize.models;

// Aca vendrian las relaciones

// User - Account 1x1

User.hasOne(Account);

Account.belongsTo(User);

//Account - Transaccion mxm

Account.belongsToMany(Transaction, {
  through: "accounttransaction",
  foreignKey: "cvu",
});

Transaction.belongsToMany(Account, {
  through: "accounttransaction",
  foreignKey: "number",
});

//User - Contact mx2 >> user have many contacts - contacts belongs to 2 users (his own user and the user that adding him)

User.belongsToMany(Contact, {
  through: "contactuser",
  as: "contacts",
  foreignKey: "iscontact_ofuser",
});

Contact.belongsToMany(User, {
  through: "contactuser",
  as: "users",
  foreignKey: "contact_id",
});

//ENCRYPTIONS

User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

//console.log(crypto.createHash('RSA-SHA256').update('super123seguro').update('sal').digest('hex'))

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    console.log("salt", user.salt());
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
