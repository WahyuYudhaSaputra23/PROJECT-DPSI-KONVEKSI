const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Report = sequelize.define('Report', {
        idReport: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TypeReport: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataReport: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Report;
};
