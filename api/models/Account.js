const { formatDate } = require('date-utils-2020')
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Account = sequelize.define('account', {

        cvu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        balance: {
            type: DataTypes.DECIMAL(15,2),
            defaultValue: 0
        },
        // UTC format
        opening_date: {
            type: DataTypes.DATE,
            defaultValue: new Date(formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss'))
        },
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