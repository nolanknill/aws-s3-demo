const router = require('express').Router();
const fs = require('fs').promises;
const crypto = require('crypto');

const FILE_PATH = "./data/galleryData.json";

const {
    AWSBucketName,
    AWSRegion
} = process.env;

const getGallery = async () => {
    const galleryFile = await fs.readFile(FILE_PATH);
    
    return JSON.parse(galleryFile);
}

const setGallery = async (gallery) => {
    return await fs.writeFile(FILE_PATH, JSON.stringify(gallery));
}

// GET /gallery: returns all items (s3 urls and titles)
router.get("/", async (_req, res) => {
    const gallery = await getGallery();

    res.json(gallery);
})

// POST /gallery/item: save the S3 url for the image, with its title!
router.post("/item", async (req, res) => {
    const { title, fileName } = req.body;

    const gallery = await getGallery();

    const newItem = {
        id: crypto.randomUUID(),
        title: title,
        src: `https://${AWSBucketName}.s3.${AWSRegion}.amazonaws.com/${fileName}`,
    };

    gallery.push(newItem)

    await setGallery(gallery);

    res.status(201).json(newItem);
})

module.exports = router;