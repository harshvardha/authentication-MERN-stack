const express = require("express")
const { StatusCodes } = require("http-status-codes")

const registerUserHandler = require("../controllers/registerUserController")
const userLoginHandler = require("../controllers/loginUserController")

const authRouter = express.Router()

authRouter.post('/register', registerUserHandler)
authRouter.post('/login', userLoginHandler)

module.exports = authRouter