var Helper = require('../../helpers/commonHelper');
var BankAccountsModel = require('../../models/BankAccountsModel');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var { Configuration, PlaidApi, PlaidEnvironments, AccountsGetRequest } = require('plaid');
var envt = PlaidEnvironments.sandbox;
var clientId = process.env.PLAID_CLIENT_ID_SANDBOX;
var secret = process.env.PLAID_SECRET_SANDBOX;

if (process.env.APP_MODE == 'production') {
    envt = PlaidEnvironments.production;
    clientId = process.env.PLAID_CLIENT_ID_PRODUCTION;
    secret = process.env.PLAID_SECRET_PRODUCTION;
}
const configuration = new Configuration({
    basePath: envt,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': clientId,
            'PLAID-SECRET': secret,
        },
    },
});
const plaidClient = new PlaidApi(configuration);

module.exports = {

    createLinkToken: async (req, res) => {
        var data = req.body;
        var userUid = data.user_info.user_uid;

        const LinkTokenCreateRequest = {
            user: {
                client_user_id: userUid,
            },
            client_name: 'Sumly',
            products: ['auth', 'transactions','transfer'],
            country_codes: ['US'],
            language: 'en'
        };

        try {
            const response = await plaidClient.linkTokenCreate(LinkTokenCreateRequest);
            const linkToken = response.data.link_token;
            res.json(Helper.apiResponse({
                status: 1,
                link_token: linkToken
            }));
        } catch (error) {
            console.log('error: ', error);
            Helper.addPlaidLogs('Link token error: User Uid: '+userUid+'; Response:'+JSON.stringify(error, Helper.replacerFunc()));
            res.json(Helper.apiResponse({
                status: 0,
                message: 'Link token not generated, try again'
            }));
        }


    },

    linkAccountByPlaidPublickToken: async (req, res) => {
        var data = req.body;
        var publicToken = data.public_token;
        var userUid = data.user_uid;
        var userInfo = data.user_info;
        var accountID = data.account_id;
        var accountName = data.account_name;

        if (publicToken && userInfo && accountID) {

            var userId = userInfo.user_id;
            const ItemPublicTokenExchangeRequest = {
                public_token: publicToken,
            };
            try {
                const response = await plaidClient.itemPublicTokenExchange(ItemPublicTokenExchangeRequest);
                const accessToken = response.data.access_token;

                const AuthGetRequest = {
                    access_token: accessToken,
                };
                try {
                    const response = await plaidClient.authGet(AuthGetRequest);
                    var accounts = response.data.accounts;
                    var numbers = response.data.numbers.ach;
                    var items = response.data.item;
                    // Helper.addPlaidLogs('User Uid: '+userUid+'; Response:'+JSON.stringify(response.data, Helper.replacerFunc()));
                    var account = accounts[0];
                    var number = numbers[0];

                    var uid = Helper.generateUid();
                    var currentDate = Helper.currentDatetime();
                    BankAccountsModel.create({
                        account_uid: uid,
                        user_id: userId,
                        account_name: accountName,
                        mask_number: accounts.mask ? Helper.encrypto(accounts.mask) : null,
                        account_number: number.account ? Helper.encrypto(number.account) : null,
                        routing_number: number.routing ? Helper.encrypto(number.routing) : null,
                        account_balance: account.balances.available,
                        account_status: 'active',
                        added_date: currentDate,
                        status: 1,
                        plaid_accountid: account.account_id,
                        account_type: account.subtype ? account.subtype : account.type,
                        custom_data: JSON.stringify({wire_routing: number.wire_routing ? Helper.encrypto(number.wire_routing) : null, institution_id:items.institution_id})
                    });
                    res.send(Helper.apiResponse({
                        status: 1,
                        message: 'Account added'
                    }))
                } catch (error) {
                    Helper.addPlaidLogs('Link account error: User Uid: '+userUid+'; Response:'+JSON.stringify(error, Helper.replacerFunc()));
                    console.log('response.error: ', error);
                    res.send(Helper.apiResponse({
                        status: 0,
                        message: 'Error, try again'
                    }))
                }
            } catch (error) {
                Helper.addPlaidLogs('Link account error: User Uid: '+userUid+'; Response:'+JSON.stringify(error, Helper.replacerFunc()));
                console.log('error: ', error);
                res.send(Helper.apiResponse({
                    status: 0,
                    message: 'Link expired, try again'
                }));
            }


        }
        else {
            res.send(Helper.apiResponse({
                status: 0,
                message: 'Public token, Account Id and User Info are missing.'
            }));
        }
    },

    webhook: async (req, res) => {
        Helper.addStripeLog(`Webhook: ${JSON.stringify(req.body)}`);
        res.send({
            status: 1,
            message: ''
        });
    },

    getBalance: async (req, res) => {
        var consumerId = req.body.consumer_info.consumer_id;
        var bankInfo = await BankAccountsModel.findOne({
            attributes: ['plaid_access_token'],
            where: { consumer_id: consumerId, user_type: 'consumer', status: 1 }
        });
        if (bankInfo && bankInfo.dataValues.plaid_access_token) {
            var accessToken = 'access-sandbox-25b764cd-45ee-40ba-ad80-8d578c74df73';
            const request = {
                access_token: accessToken,
            };
            try {
                const response = await plaidClient.accountsBalanceGet(request);
                const accounts = response.data.accounts;

                res.json({
                    status: 1,
                    data: {
                        balance: accounts[0].balances.available,
                        official_name: accounts[0].official_name,
                        name: accounts[0].name,
                        type: accounts[0].type,
                        subtype: accounts[0].subtype
                    }
                });
            } catch (error) {
                // handle error
                res.json({
                    status: 1,
                    data: {
                        balance: 0,
                        official_name: '',
                        name: '',
                        type: '',
                        subtype: ''
                    }
                });
            }
        }
        else {
            res.json({
                status: 1,
                data: {
                    balance: 0,
                    official_name: '',
                    name: '',
                    type: '',
                    subtype: ''
                }
            });
        }

    },

    getInstitutionDetails: async (institutionId, callback) => {
        const request = {
            institution_id: institutionId,
            country_codes: ['US'],
            options: { include_optional_metadata: true }
        };
        try {
            const response = await plaidClient.institutionsGetById(request);
            const institution = response.data.institution;
            callback(institution);
        } catch (error) {
            console.log(error);
            callback(false);
        }
    }
}