import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least of 6 characters long!"]
    },
    username: {
        type: String,
        // required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;