const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const Transaction = sequelize.define('transaction', {

        number: {
            type: DataTypes.STRING,
            allowNull: false
        },

        amount: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        transaction_type: {
            type: DataTypes.ENUM("ARS", "USD"),
            defaultValue: "ARS"
        },

        status: {
            type: DataTypes.ENUM("sent", "cancelled", "confirmed"),
            defaultValue: "sent"
        }
    })
};