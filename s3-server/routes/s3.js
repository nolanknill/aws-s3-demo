const router = require('express').Router();
const AWS = require('aws-sdk');

const {
    AWSAccessKeyId,
    AWSSecretKey,
    AWSBucketName,
    AWSRegion
} = process.env;

AWS.config.update({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
});

const myBucket = new AWS.S3({
    params: { 
        Bucket: AWSBucketName 
    },
    region: AWSRegion
})

const SIGNED_URL_EXPIRATION_TIME = ONE_MINUTE = 60;

const generateUniqueFileName = (fileName) => {
    const [name, extension] = fileName.split("."); // ["custom-image-1", "png"];
    const uniqueFileName = `${name}-${Date.now()}.${extension}`;

    return uniqueFileName;
}


// POST /s3/signed-url: return a URL for the front end to send a PUT request to (on AWS S3)
router.post('/signed-url', (req, res) => {
    
    const { fileName, fileType }= req.body;

    const uniqueFileName = generateUniqueFileName(fileName);

    myBucket.getSignedUrl("putObject", {
        Key: uniqueFileName, // unique name of the file
        ContentType: fileType,
        Expires: SIGNED_URL_EXPIRATION_TIME
    }, (err, url) => {

        if (err) {
            return res.status(400).json({
                error: "Unable to create signed URL"
            })
        }

        res.json({
            url: url,
            fileName: uniqueFileName
        });
    });
});

module.exports = router;