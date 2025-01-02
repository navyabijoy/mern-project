import express from 'express' // express package to create a web server
import mongoose from 'mongoose' // for MongoDB interactions
import dotenv from 'dotenv' //  load environment variables
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config() //Load environment variables from .env file

const app = express() // Create an instance of an Express application

app.use(express.json()) // format the input in json
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

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)