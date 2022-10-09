const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const connectDB = require('./config/dbConnect')
const authRouter = require('./routes/authentication')

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use("/users", authRouter)

mongoose.connection.once('open', () => {
    console.log("MONGO DB CONNECTED")
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
})