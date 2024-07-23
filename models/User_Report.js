const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserReport = sequelize.define('UserReport', {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idReport: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return UserReport;
};
