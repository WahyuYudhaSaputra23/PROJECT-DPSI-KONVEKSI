const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserManagement = sequelize.define('UserManagement', {
        idUserManagement: {
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

    return UserManagement;
};
