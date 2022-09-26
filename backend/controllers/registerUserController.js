const bcrypt = require("bcrypt")
const { StatusCodes } = require('http-status-codes')
require('dotenv').config()

const User = require("../models/Users")
const BadRequestError = require('../errors/badRequestError')

const registerUserHandler = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            password
        } = req.body
        if (!firstName) {
            return new BadRequestError("Please provide first name", 400)
        }
        if (!lastName) {
            return new BadRequestError("Please provide last name", 400)
        }
        if (!userName) {
            return new BadRequestError("Please provide user name", 400)
        }
        if (!email) {
            return new BadRequestError("Please provide email", 400)
        }
        if (!password) {
            return new BadRequestError("Please provide password", 400)
        }
        const alreadyExist = await User.findOne({ email: email })
        if (alreadyExist) {
            return new BadRequestError("User alredy exist, Please login", 400)
        }
        const passwordHash = await bcrypt.hash(password, 10)
        await User.create({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: passwordHash
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log("register user error: ", error)
    }
}

module.exports = registerUserHandler