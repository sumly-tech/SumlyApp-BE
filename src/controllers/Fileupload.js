const uploadFile = require("../middleware/Upload");
module.exports = {
    upload: async (req, res) => {
        try {
            var res1 = await uploadFile(req, res);
            if (req.file == undefined) {
                return res.status(400).send({ status:0,message: "Upload a file please!" });
            }
            
            var m = req.file.mimetype;
            var type = m.split("/")[0];
            res.status(200).send({
                status:1,
                message: "Uploaded successfully",
                filename:req.file.filename,
                type:type
            });
        } catch (err) {
            if(err.code == 'LIMIT_FILE_SIZE')
            {   
                errMsg = err.message;
            }
            else
            {
                errMsg = err;
            }
            res.status(200).send({
                status:0,
                message: errMsg,
            });
        }
    }
}