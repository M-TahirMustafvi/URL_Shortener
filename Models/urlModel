const {DataTypes} = require('sequelize');
const sequelize = require('../Config/db');

const URL = sequelize.define('URL',
{   
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    shortCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
 
    accessCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},

    {
        timestamps: true
    }
);

module.exports = URL;