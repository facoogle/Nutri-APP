const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('payment', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     allowNull: false
        // },
        paymenthID:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
    });
};