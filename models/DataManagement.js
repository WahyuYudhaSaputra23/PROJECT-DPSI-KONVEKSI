const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DataManagement = sequelize.define('DataManagement', {
        idDataManagement: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NameManager: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING
        }
    });

    return DataManagement;
};
