const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ManagementReportReport = sequelize.define('ManagementReportReport', {
        ManagementReport_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Report_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return ManagementReportReport;
};
