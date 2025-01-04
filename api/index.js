import express from 'express' // express package to create a web server
import mongoose from 'mongoose' // for MongoDB interactions
import dotenv from 'dotenv' //  load environment variables
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
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

    app.use(express.json()) // format the input in json

// start the server and listen on port 3000
app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)

 // creating middleware
app.use((err, req, res, next) => { 
    // err: error coming from input, next: to go to the next middleware
    const statusCode = err.statusCode || 500; // status code that we get from the input of the middleware 
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
     });
})