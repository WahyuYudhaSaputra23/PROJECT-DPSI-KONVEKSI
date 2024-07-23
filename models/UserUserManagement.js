const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserUserManagement = sequelize.define('UserUserManagement', {
        UserManagement_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        User_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return UserUserManagement;
};
