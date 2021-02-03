const { DataTypes } = require("sequelize");
const { formatDate } = require("date-utils-2020");

module.exports = (sequelize) => {
  const Account = sequelize.define("account", {
    cvu: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },

    opening_date: {
      type: DataTypes.STRING,
    },

    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    card_expiration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_cvv:{
      type: DataTypes.STRING,
      allowNull:false
    },
    rechargeCode:{
        type: DataTypes.STRING
    }


  });
};
