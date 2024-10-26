import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String, // cloudinary image
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }

}, {timestamps : true})

export const Blog = mongoose.model("Blog", blogSchema)