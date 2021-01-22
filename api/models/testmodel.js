const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('test', {
        name: DataTypes.STRING
    })
}