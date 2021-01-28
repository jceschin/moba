const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{

    const User = sequelize.define('user', {

        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        phone: {
            type: DataTypes.STRING,
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
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                return() => this.getDataValue('salt')
            }
        },

        rol: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        } 
    })
}