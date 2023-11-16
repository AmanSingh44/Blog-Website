const User = require('../model/user')
const Token = require('../model/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const signupUser = async(req, res) => {
    const { name, username, password } = req.body
    let newUser
    try {
        const hashedPassword = await bcrypt.hashSync(password, 10)


        newUser = new User({
            name,
            username,
            password: hashedPassword
        })
        newUser = await newUser.save()

        res.status(200).json({ newUser })
    } catch (err) {
        console.log('Error while adding user', err)
        res.status(500).json({ message: "error while signup(from controller)" })
    }
}

const loginUser = async(req, res) => {
    //const { username, password } = req.body
    let user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(400).json({ message: 'Username does not match' })
    }
    try {
        let match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({ token: refreshToken })
            await newToken.save()

            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
        } else {
            return res.status(400).json({ message: 'Password dpes not match' })
        }
    } catch (err) {
        console.log("Error while logging in user", err)
        return res.status(500).json({ message: "Error while loging in user" })
    }

}


module.exports = { signupUser, loginUser }