var AccountsModel = require('../../models/BankAccountsModel');
var Helper = require('../../helpers/commonHelper');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

module.exports = {
    list: async (Req, Res) => {
        var body = Req.body;
        var loggedUserInfo = body.user_info;
        var keyword = body.keyword ? body.keyword : "";

        var condition = {
            user_id: loggedUserInfo.user_id,
            status: 1
        };
        if (keyword) {
            condition[Op.or] = [
                {
                    account_name: {
                        [Op.like]: `${keyword}%`
                    }
                }
            ]
        }
        const { page, size, title } = body;
        const { limit, offset } = Helper.getPagination(page, size);
        var list = await AccountsModel.findAndCountAll({
            attributes: ['account_uid', 'account_name', 'account_type', 'account_number', 'account_balance', 'account_status', 'added_date', 'routing_number','mask_number'],
            where: condition,
            order: [['added_date', 'DESC']],
            limit,
            offset
        });
        var rows = list.rows;
        var result = [];
        rows.forEach(row => {
            row.dataValues.account_number = row.dataValues.account_number ? Helper.decrypto(row.dataValues.account_number) : '';
            row.dataValues.routing_number = row.dataValues.routing_number ? Helper.decrypto(row.dataValues.routing_number) : '';
            if(!row.dataValues.mask_number){
                row.dataValues.mask_number = row.dataValues.account_number;
            }
            else{
                row.dataValues.mask_number = Helper.decrypto(row.dataValues.mask_number);
            }

            delete row.dataValues.routing_number;
            result.push(row);
        })
        list.rows = result;

        var response = Helper.getPagingData(list, page, limit);
        var apiStatus = 0;
        if (list.count) {
            apiStatus = 1;
        }
        response.status = apiStatus;
        Res.json(Helper.apiResponse(response));
    },

    /* add: async (Req, Res) => {
        var body = Req.body;

        var userId = body.user_info.user_id;
        var accountName = body.account_name;
        var accountNumber = body.account_number;
        var routingNumber = body.routing_number;

        if (accountName && accountNumber && userId) {
            var currentDate = Helper.currentDatetime();
            var uid = Helper.generateUid();
            AccountsModel.create({
                account_uid: uid,
                user_id: userId,
                account_name: accountName,
                mask_number: Helper.encrypto(accountNumber),
                account_number: Helper.encrypto(accountNumber),
                routing_number: routingNumber ? Helper.encrypto(routingNumber) : null,
                account_balance: 0,
                account_status: 'active',
                added_date: currentDate,
                status: 1
            });
            Res.json(Helper.apiResponse({
                status: 1,
                message: 'Added successfully',
                data: {
                    account_uid: uid
                }
            }));
        }
        else {
            Res.json(Helper.apiResponse({
                status: 0,
                message: 'All fields are required'
            }));
        }
    },

    disconnectAccount: async (Req, Res) => {
        var body = Req.body;

        var userId = body.user_info.user_id;
        var accountUid = body.account_uid;

        var accountInfo = await AccountsModel.findOne({
            attributes: ['account_id'],
            where: { account_uid: accountUid, user_id: userId }
        });

        if (accountInfo) {
            AccountsModel.update(
                { status: 4 },
                { where: { account_id: accountInfo.dataValues.account_id } }
            );
            Res.json(Helper.apiResponse({
                status: 1,
                message: 'Disconnected successfully'
            }));
        }
        else {
            Res.json(Helper.apiResponse({
                status: 0,
                message: 'Account not found'
            }));
        }
    }, */
}