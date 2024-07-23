const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Production = sequelize.define('Production', {
        idProduction: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ProductionStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idEmployees: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Production;
};
