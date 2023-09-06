const router = require('express').Router();
const AWS = require('aws-sdk');

const generateUniqueFileName = (fileName) => `${Date.now()}-${fileName}`;

const {
    AWSAccessKeyId,
    AWSSecretKey,
    AWSBucketName,
    AWSRegion
} = process.env;

AWS.config.update({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
})

const bucket = new AWS.S3({
    params: {
        Bucket: AWSBucketName
    },
    region: AWSRegion
})

const SIGNED_URL_EXPIRATION_TIME = ONE_MINUTE = 60;

// POST /s3/signed-url
router.post("/signed-url", (req, res) => {
    const { fileName, fileType } = req.body;
    
    // requires unique file name
    const uniqueFileName = generateUniqueFileName(fileName);

    bucket.getSignedUrl("putObject", {
        Key: uniqueFileName,
        ContentType: fileType,
        Expires: SIGNED_URL_EXPIRATION_TIME
    }, (err, url) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to create Signed URL"
            })
        }

        res.status(201).json({
            url: url,
            fileName: uniqueFileName
        })
    })



    

})

module.exports = router;