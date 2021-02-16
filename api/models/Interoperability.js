const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Interoperability = sequelize.define('interoperability', {

        external_cvu: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        our_cvu: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        external_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        external_amount: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },
        external_description: {
            type: DataTypes.STRING,
        }

    })
}