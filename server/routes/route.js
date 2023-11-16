const express = require('express')
const { signupUser, loginUser } = require('../controller/user-controller')
const { uploadImage, getImage } = require('../controller/image-controller')
const { createPost } = require('../controller/post-controller')
const {authenticateToken}=require('../controller/jwt-controller')
const router = express.Router()
const { upload } = require('../utils/upload')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename/', getImage)
router.post('/create',authenticateToken, createPost)

module.exports = router