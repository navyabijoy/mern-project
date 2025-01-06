import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // a username should be present
        unique: true, // a username should be unique
    },
    email: {
        type: String,
        required: true, // an email should be present
        unique: true, // email should be unique
    },
    password: { 
        type: String,
        required: true, // a password should be present
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User