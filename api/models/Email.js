const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Email = sequelize.define("email", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            /* unique: true, */
        },
        valideId: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        valide: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}