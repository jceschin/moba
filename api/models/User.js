const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('user', {

        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty:true}
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {notEmpty:true}
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },

        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
       
        },

        password: {
            type: DataTypes.STRING,
            validate: {notEmpty:true},
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: DataTypes.STRING,
            validate: {notEmpty:true},
            get() {
                return () => this.getDataValue('salt')
            }
        },

        rol: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },
        
        recoveryToken: {
            type: DataTypes.STRING,
          },
    })
}