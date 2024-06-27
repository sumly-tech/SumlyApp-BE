var { sequelize, Sequelize } = require('../config/seq_db');
const UserAccounts = sequelize.define(process.env.ACCOUNTS, {
    account_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    account_uid: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: false 
    },
    user_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        allowNull: false 
    },
    account_type: { 
        type: Sequelize.DataTypes.STRING(20), 
        allowNull: true 
    },
    account_name: { 
        type: Sequelize.DataTypes.STRING(200), 
        allowNull: true 
    },
    mask_number: { 
        type: Sequelize.DataTypes.STRING(150), 
        allowNull: true 
    },
    account_number: { 
        type: Sequelize.DataTypes.STRING(255), 
        allowNull: true 
    },
    routing_number: { 
        type: Sequelize.DataTypes.STRING(255), 
        allowNull: true 
    },
    account_balance: { 
        type: Sequelize.DataTypes.DECIMAL(10,2), 
        allowNull: true 
    },
    plaid_accountid: { 
        type: Sequelize.DataTypes.STRING(120), 
        allowNull: true 
    },
    account_status: { 
        type: Sequelize.DataTypes.STRING(20), 
        allowNull: true 
    },
    custom_data: { 
        type: Sequelize.DataTypes.JSON, 
        allowNull: true 
    },
    added_date: { 
        type: Sequelize.DataTypes.DATE, 
        allowNull: false 
    },
    status: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        allowNull: false ,
        comment: '1 if active, 2 if inactive, 3 if deleted',
        defaultValue: 0
    },
    is_primary: { 
        type: Sequelize.DataTypes.INTEGER(6), 
        allowNull: true ,
        comment: '1 if primary',
        defaultValue: 0
    }
});
// UserAccounts.sync({ /* force: true */ alter: true  });
UserAccounts.removeAttribute('id');
module.exports = UserAccounts;