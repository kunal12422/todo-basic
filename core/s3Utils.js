import aws  from 'aws-sdk'
import uuid  from 'uuid'
import multer  from 'multer'
import s3   from 'multer-s3'

aws.config.update({
    
    secretAccessKey:'<secret-access-key>',
    accessKeyId:  '<access-key>',

    region: 'ap-south-1',
  });
let s3opt = new aws.S3({ /* ... */ });
let upload = multer({
    storage: s3({
      s3: s3opt,
      bucket: 'kunal12422uploads',
      
      contentType: (req, file, next)=> {
          
        next(null, file.mimetype);
      },
      key: function(req, file, cb) {
        
        let flname = file.originalname;
        
        cb(null, uuid.v1() + '' + flname); 
    }
    })
  });

  
export default upload;
