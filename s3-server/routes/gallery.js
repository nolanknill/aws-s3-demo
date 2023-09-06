const router = require('express').Router();
const fs = require('fs');
const FILE_PATH = "./data/galleryData.json";

const {
    AWSBucketName,
    AWSRegion
} = process.env;

const getGallery = () => {
    return JSON.parse(fs.readFileSync(FILE_PATH));
}

const setGallery = (gallery) => {
    return fs.writeFileSync(FILE_PATH, JSON.stringify(gallery));
}

router.post("/item", (req, res) => {
    const { title, fileName } = req.body;

    const url = `https://${AWSBucketName}.s3.${AWSRegion}.amazonaws.com/${fileName}`;

    const newItem = {
        title,
        url
    }

    const gallery = getGallery();

    gallery.push(newItem);

    setGallery(gallery);

    res.status(201).json(newItem);
})

router.get("/", (_req, res) => {
    res.json(getGallery());
});


module.exports = router;