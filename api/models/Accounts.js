/* import { formatDate } from 'date-utils-2020' */   //Rompe, checkear
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Accounts = sequelize.define('accounts', {

        cvu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        balance: {
            type: DataTypes.DECIMAL(15,2),
            defaultValue: 0
        },
        // UTC format      ROMPE, CHECKEAR
       /*  opening_date: {
            type: DataTypes.INTEGER,
            defaultValue: formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss')
        }, */
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        card_expiration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }) 
}