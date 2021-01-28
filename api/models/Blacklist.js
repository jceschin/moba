const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{

    const Blacklist = sequelize.define('blacklist', {

        token:{
            type: DataTypes.STRING,
            unique: true,
        },
    }
    )}