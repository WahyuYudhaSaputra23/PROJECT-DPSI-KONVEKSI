const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EmployeeDataManagement = sequelize.define('EmployeeDataManagement', {
        DataManagement_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return EmployeeDataManagement;
};
