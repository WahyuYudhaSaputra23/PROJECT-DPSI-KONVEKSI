const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Employees = sequelize.define('Employees', {
        idEmployees: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        EmployeeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Position: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Salary: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        idManagementReport: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Employees;
};
