const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const Accounttransaction = sequelize.define('accounttransaction', {

        cvu: {
            type: DataTypes.REAL,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM("sender", "receiver", "charge"),
            defaultValue: "charge",
            allowNull: false
        },

        old_balance: {
            type: DataTypes.DECIMAL(15,2),
        },
        
        new_balance: {
            type: DataTypes.DECIMAL(15,2),
        },
        status:{
            type: DataTypes.STRING,
            defaultValue: 'cancelled'
        }
    })
};