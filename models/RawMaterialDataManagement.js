const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RawMaterialDataManagement = sequelize.define('RawMaterialDataManagement', {
        DataManagement_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        RawMaterial_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return RawMaterialDataManagement;
};
