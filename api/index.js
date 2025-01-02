import express from 'express' // express package to create a web server
import mongoose from 'mongoose' // for MongoDB interactions
import dotenv from 'dotenv' //  load environment variables

dotenv.config() //Load environment variables from .env file


const app = express() // Create an instance of an Express application


mongoose
    .connect(process.env.MONGO) //if you are connected to mongo db then
    .then(() => {
        console.log('connected to mongo db')
    })
    .catch((err) => {
        console.log(err)
    })

// start the server and listen on port 3000
app.listen(3000, () => {
    console.log("server is running on port 3000")
})