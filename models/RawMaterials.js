const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RawMaterials = sequelize.define('RawMaterials', {
        idRawMaterial: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RawMaterialName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProduction: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return RawMaterials;
};
