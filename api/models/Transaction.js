const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const Transaction = sequelize.define('transaction', {

        number: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },

        amount: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
        },

        transaction_type: {
            type: DataTypes.ENUM("charge", "transfer", "drawback"),
        },
        transaction_code:{
            type: DataTypes.STRING
        },

        status: {
            type: DataTypes.ENUM("processing", "cancelled", "confirmed"),
        }
    })
};