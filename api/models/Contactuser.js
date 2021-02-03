const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const contact_user = sequelize.define('contactuser', {
        contact_id:{
            type: DataTypes.INTEGER,

        },
        iscontact_ofuser:{
            type: DataTypes.INTEGER,
        },
        contact_userid: {
            type: DataTypes.INTEGER,
        }
    })
};