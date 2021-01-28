const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const Transaction = sequelize.define('transaction', {

        number: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            type: DataTypes.ENUM("charge", "transfer", "send"),
            defaultValue: "send"
        },

        status: {
            type: DataTypes.ENUM("processing", "cancelled", "confirmed"),
            defaultValue: "processing"
        }
    })
};