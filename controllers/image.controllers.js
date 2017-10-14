
import upload from '../core/s3Utils'
var uploader = upload.single('file');

const controller = {};

controller.upload = (req, res) => {
    uploader(req, res, function(err) {
        if(err) return res.status(500).json({ message: err });
        
        // console.log(JSON.stringify(req.file ))
        res.status(201).json({ filename: req.file.location});
        
        });
}

export default controller;