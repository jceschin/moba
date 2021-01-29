const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Email = sequelize.define("email", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        valideId: {
            type: DataTypes.INTEGER,
        },
        valide: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}