const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ProductDataManagement = sequelize.define('ProductDataManagement', {
        ManagementData_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Products_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return ProductDataManagement;
};
