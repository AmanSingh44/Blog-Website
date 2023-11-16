const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const dotenv = require('dotenv')
dotenv.config()

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wfqrcdh.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },

    file: (request, file) => {

        console.log(file); // Log the file object to the console

        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

const upload = multer({ storage });

module.exports = { upload };