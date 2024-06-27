require('express-router-group');
var r = require('express').Router();
const { append } = require('express/lib/response');

// importing middlwares
var UserMiddleware = require('../middleware/UserMiddleware');

var Fileupload = require('../controllers/Fileupload');
var SignupController = require('../controllers/auth/SignupController');
var LoginController = require('../controllers/auth/LoginController');
var UserController = require('../controllers/user/User');
var PlaidController = require('../controllers/third_party/Plaid');
var BankAccountsController = require('../controllers/user/BankAccounts');

r.group("/v1", rt => {
    rt.group("/user", userRoute => {
        userRoute.post('/signup', SignupController.signup);
        userRoute.post('/login', LoginController.login);

        userRoute.get('/details', UserMiddleware, UserController.details);

        userRoute.post('/bank/create-token', UserMiddleware, PlaidController.createLinkToken);
        userRoute.post('/bank/link-account', UserMiddleware, PlaidController.linkAccountByPlaidPublickToken);
        userRoute.post('/bank/list', UserMiddleware, BankAccountsController.list);
    })
    rt.post('/global/upload-file', Fileupload.upload);
});
r.get('*', (req, res) => {
    res.send({
        status: 0,
        message: 'Unknown request'
    });
});
r.post('*', (req, res) => {
    res.send({
        status: 0,
        message: 'Unknown request'
    });
});
module.exports = r;