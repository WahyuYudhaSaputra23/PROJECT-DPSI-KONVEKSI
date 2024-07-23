const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Products = sequelize.define('Products', {
        idProduct: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ProductName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idProduction: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Products;
};
