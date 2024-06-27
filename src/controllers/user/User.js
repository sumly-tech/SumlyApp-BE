var Helper = require('../../helpers/commonHelper');
var UserModel = require('../../models/UserModel');
var UserAddressModel = require('../../models/UserAddressModel');

module.exports = {

    details: async (Req, Res) => {
        var body = Req.body;
        var details = body.user_info;

        delete details.user_id;
        delete details.password;
        delete details.otp;
        delete details.checkbook_data;
        Res.json(Helper.apiResponse({
            status: 1,
            data: {
                details: details,
                profile_image_path: process.env.PROFILE_IMAGE_PATH
            }
        }));
    }
}