const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Unregistered = sequelize.define("unregistered", {

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    status: {
        type: DataTypes.ENUM("pending","confirmed", "cancelled"),
        defaultValue: "pending",
    },


  });
};
