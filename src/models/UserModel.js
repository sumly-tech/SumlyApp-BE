var { sequelize, Sequelize } = require('../config/seq_db');
const User = sequelize.define(process.env.USERS, {
    user_id: { 
        type: Sequelize.DataTypes.INTEGER(11), 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    user_uid: { 
        type: Sequelize.DataTypes.STRING(50), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    fname: { 
        type: Sequelize.DataTypes.STRING(120), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: false 
    },
    lname: { 
        type: Sequelize.DataTypes.STRING(100), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    preferred_name: { 
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true 
    },
    email: { 
        type: Sequelize.DataTypes.STRING(100), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    phone: { 
        type: Sequelize.DataTypes.STRING(15), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    gender: { 
        type: Sequelize.DataTypes.STRING(20), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    password: { 
        type: Sequelize.DataTypes.STRING(200), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    dob: { 
        type: Sequelize.DataTypes.DATE, 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    save_reason: { 
        type: Sequelize.DataTypes.STRING(255), 
        allowNull: true 
    },
    occpation: { 
        type: Sequelize.DataTypes.TEXT, 
        allowNull: true 
    },
    employee_type: { 
        type: Sequelize.DataTypes.TEXT, 
        allowNull: true 
    },
    is_incorporated: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        allowNull: true,
        defaultValue: 0,
        comment: '1 if yes, 2 if no'
    },
    business_structure: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    business_structure_other: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    employement_type: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    last_year_income: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    salary_deposit_mode: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    tax_fill_type: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    has_dependent: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        allowNull: true,
        defaultValue: 0,
        comment: '1 if yes, 2 if no'
    },
    dependent_value: { 
        type: Sequelize.DataTypes.JSON, 
        allowNull: true 
    },
    primary_state: { 
        type: Sequelize.DataTypes.STRING(10), 
        allowNull: true 
    },
    city: { 
        type: Sequelize.DataTypes.STRING(50), 
        allowNull: true 
    },
    is_working_in_other_state: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        allowNull: true,
        defaultValue: 0,
        comment: '1 if yes, 2 if no'
    },
    working_states: { 
        type: Sequelize.DataTypes.JSON, 
        allowNull: true
    },
    has_separate_business_bank_account: { 
        type: Sequelize.DataTypes.TINYINT(1), 
        allowNull: true,
        defaultValue: 0,
        comment: '1 if yes, 2 if no'
    },
    expenses_track_mode: { 
        type: Sequelize.DataTypes.TEXT, 
        allowNull: true
    },
    otp: { 
        type: Sequelize.DataTypes.INTEGER(6), 
        primaryKey: false, 
        autoIncrement: false, 
        allowNull: true 
    },
    profile_picture: { 
        type: Sequelize.DataTypes.STRING(50), 
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
    }
});
// User.sync({ /* force: true */ alter: true });
User.removeAttribute('id');
module.exports = User;