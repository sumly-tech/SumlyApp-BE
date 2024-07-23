const Helper = require('../../helpers/commonHelper');
const UserModel = require('../../models/UserModel');
const UserAddressModel = require('../../models/UserAddressModel');
var fs = require('fs')

module.exports = {
    signup: async (req, res) => {
        var body = Helper.sanitizeInput(req.body);
        console.log('body: ',body);
        var fname = Helper.sanitizeInput(body.fname);
        var preferredName = Helper.sanitizeInput(body.preferred_name);
        var lname = Helper.sanitizeInput(body.lname);
        var email = Helper.sanitizeInput(body.email);
        var password = Helper.sanitizeInput(body.password);
        var dob = Helper.sanitizeInput(body.dob);
        var save_reason = Helper.sanitizeInput(body.save_reason);
        var occpation = Helper.sanitizeInput(body.occpation);
        var employee_type = Helper.sanitizeInput(body.employee_type);
        var is_incorporated = Helper.sanitizeInput(body.is_incorporated);
        var business_structure = Helper.sanitizeInput(body.business_structure);
        var business_structure_other = Helper.sanitizeInput(body.business_structure_other);
        var employement_type = Helper.sanitizeInput(body.employement_type);
        var last_year_income = Helper.sanitizeInput(body.last_year_income);
        var salary_deposit_mode = Helper.sanitizeInput(body.salary_deposit_mode);
        var tax_fill_type = Helper.sanitizeInput(body.tax_fill_type);
        var has_dependent = Helper.sanitizeInput(body.has_dependent);
        var dependent_value = Helper.sanitizeInput(body.dependent_value);
        // console.log('dependent_value: ',dependent_value);
        var primary_state = Helper.sanitizeInput(body.primary_state);
        var city = Helper.sanitizeInput(body.city);
        var is_working_in_other_state = Helper.sanitizeInput(body.is_working_in_other_state);
        var working_states = Helper.sanitizeInput(body.working_states);
        var has_separate_business_bank_account = Helper.sanitizeInput(body.has_separate_business_bank_account);
        var expenses_track_mode = Helper.sanitizeInput(body.expenses_track_mode);
        var salary_deposit_mode_other = Helper.sanitizeInput(body.salary_deposit_mode_other);
        var expenses_track_mode_other = Helper.sanitizeInput(body.expenses_track_mode_other);
        

        if (fname && lname && save_reason && occpation && employee_type && is_incorporated && business_structure && employement_type && last_year_income && salary_deposit_mode && tax_fill_type && has_dependent && primary_state && city && is_working_in_other_state && has_separate_business_bank_account && expenses_track_mode) {

            var uid = Helper.generateUid();
            var currentDate = Helper.currentDatetime();
            UserModel.create({
                user_uid: uid,
                fname: fname,
                lname: lname,
                email: email,
                password: password ? Helper.encryptPassword(password) : null,
                save_reason: save_reason,
                dob: dob,
                preferred_name: preferredName,
                occpation: occpation,
                employee_type: employee_type,
                is_incorporated: is_incorporated == 'yes' ? 1 : 0,
                business_structure: business_structure,
                business_structure_other: business_structure_other,
                employement_type: employement_type,
                last_year_income: last_year_income,
                salary_deposit_mode: salary_deposit_mode ? salary_deposit_mode.join(',') : null,
                tax_fill_type: tax_fill_type,
                has_dependent: has_dependent == 'yes' ? 1 : 0,
                dependent_value: dependent_value,
                primary_state: primary_state,
                city: city,
                is_working_in_other_state: is_working_in_other_state == 'yes' ? 1 : 0,
                working_states: working_states,
                has_separate_business_bank_account: has_separate_business_bank_account == 'yes' ? 1 : 0,
                expenses_track_mode: expenses_track_mode,
                salary_deposit_mode_other:salary_deposit_mode_other,
                expenses_track_mode_other: expenses_track_mode_other,
                added_date: currentDate,
                status: 1
            }).then(async (userDetails) => {
                
                res.json(Helper.apiResponse({
                    status: 1,
                    message: 'Details saved.',
                    data: {
                        token: Helper.createJwtToken(uid)
                    }
                }));
            }).catch(e => {
                console.log('error: ',e);
                Helper.addLog(`User signup: ${e}`);
                res.json(Helper.apiResponse({
                    status: 0,
                    message: process.env.GLOBAL_SERVER_ERROR
                }));
            });
        }
        else{
            res.json({
                status: 0,
                message: 'All fields are required'
            });
        }
    },
}