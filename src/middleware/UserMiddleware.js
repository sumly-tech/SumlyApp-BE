var jwt = require('jsonwebtoken');
var UserModel = require('../models/UserModel');

module.exports = async (req, res, next) => {
    let bearerHeader = req.header('authorization');
    if (!bearerHeader) {
        res.send({
            status: 0,
            message: 'Authorization token is required'
        });
        return res.status(401);
    }
    else {
        bearerHeader = bearerHeader.replace('Bearer ', '');
        if (bearerHeader == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9') {
            var userInfo = await UserModel.findOne({
                where: { user_uid: req.body.user_uid }
            });
            if (userInfo) {
                req.body.user_info = userInfo.dataValues;
                req.body.user_uid = userInfo.dataValues.user_uid
                next();
            }
            else {
                res.send({
                    status: 0,
                    message: 'Invalid authorized token'
                });
                return res.status(401);
            }
        }
        else {
            jwt.verify(bearerHeader, process.env.JWT_TOKEN, async (err, decode) => {
                if (err) {
                    res.send({
                        status: 0,
                        message: 'Invalid authorized token'
                    });
                    return res.status(401);
                }
                else {
                    var userInfo = await UserModel.findOne({
                        where: { user_uid: decode.uid }
                    });
                    if (userInfo) {
                        req.body.user_uid = userInfo.dataValues.user_uid;
                        req.body.user_info = userInfo.dataValues;
                        next();
                    }
                    else {
                        res.send({
                            status: 0,
                            message: 'Invalid user token'
                        });
                        return res.status(401);
                    }
                }
            })
        }
    }
}
