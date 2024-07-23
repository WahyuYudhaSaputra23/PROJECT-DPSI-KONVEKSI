const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ManagementReport = sequelize.define('ManagementReport', {
        idManagementReport: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NameManager: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT
        }
    });

    return ManagementReport;
};
