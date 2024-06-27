const Helper = require('../../helpers/commonHelper');
const UserModel = require('../../models/UserModel');
const LoginHistoryModel = require('../../models/LoginHistoryModel');

module.exports = {
    login: (req, res) => {
        var body = Helper.sanitizeInput(req.body);
        const username = body.email;
        const password = body.password;
        console.log('esdf');
        if (password && username) {

            UserModel.findOne({
                attributes: ['user_uid', 'user_id', 'status', 'password'],
                where: { email: username }
            }).then(async ud => {
                ud = ud ? ud.dataValues : '';
                if (ud) {
                    if (ud.status == '1') {
                        if (Helper.comparePassword(password, ud.password)) {

                            // Save device
                            var ua = req.headers['user-agent'];
                            var systemName = Helper.getSystemName(ua);
                            var userAgentName = Helper.getUserAgentName(ua);
                            var deviceName = Helper.getDeviceType(ua);
                            var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                            var isDeviceSaved = await LoginHistoryModel.findOne({
                                where: { 
                                    actual_browser_name: ua, 
                                    user_id: ud.user_id 
                                }
                            });
                            // console.log('isDeviceSaved: ',isDeviceSaved);
                            if (isDeviceSaved == '' || isDeviceSaved == null) {
                                LoginHistoryModel.create({
                                    user_id: ud.user_id,
                                    browser_name: userAgentName + ', ' + systemName,
                                    actual_browser_name: ua,
                                    datetime: Helper.currentDatetime(),
                                    device_type: deviceName,
                                    ip_address: Helper.removeFFFFFromIPv6(ipAddress)
                                });
                            }

                            res.send(Helper.apiResponse({
                                status: 1,
                                message: 'Login success',
                                data: {
                                    token: Helper.createJwtToken(ud.user_uid)
                                }
                            }));
                        }
                        else {
                            res.send(Helper.apiResponse({
                                status: 0,
                                message: 'Incorrect password'
                            }));
                        }
                    }
                    else if (ud.status == 'inactive') {
                        res.send(Helper.apiResponse({
                            status: 0,
                            message: 'Account inactive'
                        }));
                    }
                    else if (ud.status == 'suspend') {
                        res.send(Helper.apiResponse({
                            status: 0,
                            message: 'Account suspended'
                        }));
                    }
                }
                else {
                    res.send(Helper.apiResponse({
                        status: 0,
                        message: 'User not found'
                    }));
                }
            }).catch(error => {
                Helper.addLog(`Login, data: ${JSON.stringify(body)}, error: ${error}`);
                res.send(Helper.apiResponse({
                    status: 0,
                    message: process.env.GLOBAL_SERVER_ERROR
                }));
            });
        }
        else {
            res.send(Helper.apiResponse({
                status: 0,
                message: 'Email and Password are required fields'
            }));
        }
    }
}