const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Role: {
            type: DataTypes.ENUM('admin', 'pemilik', 'karyawan'),
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true 
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        }
    });

    return User;
};
