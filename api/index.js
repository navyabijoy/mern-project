import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

mongoose
    .connect(process.env.MONGO) //if you are connected to mongo db then
    .then(() => {
        console.log('connected to mongo db')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log("server is running on port 3000")
})