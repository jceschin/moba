const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Contact = sequelize.define("contact", {
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact_surname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull:false
    },
  });
};
