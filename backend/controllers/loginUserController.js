const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const User = require("../models/Users")
const BadRequestError = require("../errors/badRequestError")
const NotFoundError = require("../errors/notFoundError")

const userLoginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new BadRequestError("Please provide valid credentials", 400)
        }
        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
            return new NotFoundError("User not found", 404)
        }
        const decryptedPassword = await bcrypt.compare(password, foundUser.password)
        if (!decryptedPassword) {
            return new BadRequestError("Please provide correct password", 400)
        }
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "email": email,
                    "username": foundUser.userName
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { "expiresIn": '1m' }
        )
        const refreshToken = jwt.sign(
            {
                "userInfo": {
                    "email": email,
                    "username": foundUser.userName
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            { "expiresIn": '1d' }
        )
        foundUser.refreshToken = refreshToken
        await foundUser.save()
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(StatusCodes.OK).json({ accessToken })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log("login user error: ", error)
    }
}

module.exports = userLoginHandler