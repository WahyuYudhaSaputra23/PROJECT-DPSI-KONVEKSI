const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: "mysql",
    logging: false
});

// Konfigurasi koneksi Sequelize
// const sequelize = new Sequelize('data_konveksi', 'Praktikum', 'jogjahariini24', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// Import semua model
const DataManagement = require('./DataManagement')(sequelize);
const Employees = require('./Employees')(sequelize);
const ManagementReport = require('./ManagementReport')(sequelize);
const ManagementReportReport = require('./ManagementReportReport')(sequelize);
const Products = require('./Products')(sequelize);
const ProductDataManagement = require('./ProductDataManagement')(sequelize);
const Production = require('./Production')(sequelize);
const RawMaterials = require('./RawMaterials')(sequelize);
const RawMaterialDataManagement = require('./RawMaterialDataManagement')(sequelize);
const Report = require('./Report')(sequelize);
const User = require('./User')(sequelize);
const UserManagement = require('./UserManagement')(sequelize);
const UserUserManagement = require('./UserUserManagement')(sequelize);
const EmployeeDataManagement = require('./EmployeeDataManagement')(sequelize);

// Definisikan relasi antara model
ManagementReport.hasMany(ManagementReportReport, { foreignKey: 'ManagementReport_id' });
ManagementReportReport.belongsTo(ManagementReport, { foreignKey: 'ManagementReport_id' });

Report.hasMany(ManagementReportReport, { foreignKey: 'Report_id' });
ManagementReportReport.belongsTo(Report, { foreignKey: 'Report_id' });

UserManagement.hasMany(UserUserManagement, { foreignKey: 'UserManagement_id' });
UserUserManagement.belongsTo(UserManagement, { foreignKey: 'UserManagement_id' });

User.hasMany(UserUserManagement, { foreignKey: 'User_id' });
UserUserManagement.belongsTo(User, { foreignKey: 'User_id' });

DataManagement.hasMany(Employees, { foreignKey: 'DataManagement_id' });
Employees.belongsTo(DataManagement, { foreignKey: 'DataManagement_id' });

DataManagement.hasMany(ProductDataManagement, { foreignKey: 'ManagementData_id' });
ProductDataManagement.belongsTo(DataManagement, { foreignKey: 'ManagementData_id' });

Products.hasMany(ProductDataManagement, { foreignKey: 'Products_id' });
ProductDataManagement.belongsTo(Products, { foreignKey: 'Products_id' });

DataManagement.hasMany(RawMaterialDataManagement, { foreignKey: 'DataManagement_id' });
RawMaterialDataManagement.belongsTo(DataManagement, { foreignKey: 'DataManagement_id' });

RawMaterials.hasMany(RawMaterialDataManagement, { foreignKey: 'RawMaterial_id' });
RawMaterialDataManagement.belongsTo(RawMaterials, { foreignKey: 'RawMaterial_id' });

Production.hasMany(Products, { foreignKey: 'idProduction' });
Products.belongsTo(Production, { foreignKey: 'idProduction' });

Production.hasMany(RawMaterials, { foreignKey: 'idProduction' });
RawMaterials.belongsTo(Production, { foreignKey: 'idProduction' });

Production.hasMany(Employees, { foreignKey: 'idProduction' });
Employees.belongsTo(Production, { foreignKey: 'idProduction' });

ManagementReport.hasMany(Employees, { foreignKey: 'idManagementReport' });
Employees.belongsTo(ManagementReport, { foreignKey: 'idManagementReport' });

User.belongsToMany(Report, { through: 'UserReport', foreignKey: 'idUser' });
Report.belongsToMany(User, { through: 'UserReport', foreignKey: 'idReport' });

// Export instance sequelize dan model
module.exports = {
    sequelize,
    DataManagement,
    Employees,
    ManagementReport,
    ManagementReportReport,
    Products,
    ProductDataManagement,
    Production,
    RawMaterials,
    RawMaterialDataManagement,
    Report,
    User,
    UserManagement,
    UserUserManagement,
    EmployeeDataManagement
};
