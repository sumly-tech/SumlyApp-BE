var { sequelize, Sequelize } = require('../config/seq_db');
const LoginHistory = sequelize.define(process.env.LOGIN_HISTORY, {
    login_history_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    user_id: { 
        type: Sequelize.DataTypes.INTEGER(11)
    },
    browser_name: { 
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true 
    },
    actual_browser_name: { 
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true 
    },
    datetime: { 
        type: Sequelize.DataTypes.DATE
    },
    device_type: { 
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true 
    },
    ip_address: { 
        type: Sequelize.DataTypes.STRING(25), 
        allowNull: true,
    },
    device_id: { 
        type: Sequelize.DataTypes.STRING(120), 
        allowNull: true
    }
},{
    freezeTableName: true
});
// LoginHistory.sync({ force: true/* alter: true */ });
LoginHistory.removeAttribute('id');
module.exports = LoginHistory;