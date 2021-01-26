const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{

    const User = sequelize.define('user', {

        name:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        surname:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false
        },

        city:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        state:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        dni: {
            type: DataTypes.REAL,
            allowNull: false,
            unique: true,
        },

        phone: {
            type: DataTypes.REAL,
            allowNull: false
        },
        
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        account_status: {
            type: DataTypes.ENUM("registered", "verified", "admin"),
            defaultValue: "registered",
        } 
    })
}