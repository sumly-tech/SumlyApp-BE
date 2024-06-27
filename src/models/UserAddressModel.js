var { sequelize, Sequelize } = require('../config/seq_db');
const UserAddress = sequelize.define(process.env.USER_ADDRESS, {
    address_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    address_uid: { 
        type: Sequelize.DataTypes.STRING(50), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    user_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    street_1: { 
        type: Sequelize.DataTypes.STRING(200), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    street_2: { 
        type: Sequelize.DataTypes.STRING(200), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    city: { 
        type: Sequelize.DataTypes.STRING(50), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    state: { 
        type: Sequelize.DataTypes.STRING(20), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    zip: { 
        type: Sequelize.DataTypes.STRING(10), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    country: { 
        type: Sequelize.DataTypes.STRING, 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    added_date: { 
        type: Sequelize.DataTypes.DATE, 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    status: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false ,
        comment: '1 if active, 2 if inactive, 3 if deleted',
        defaultValue: 0
    },
    is_primary: { 
        type: Sequelize.DataTypes.INTEGER(6), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true ,
        comment: '1 if primary',
        defaultValue: 0
    }
});
// UserAddress.sync({ /* force: true */ alter: true  });
UserAddress.removeAttribute('id');
module.exports = UserAddress;