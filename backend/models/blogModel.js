const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    body:{
        type: String,
        required: true
    },
    postedBy:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        data: Buffer
    }

})

const Blog = mongoose.model('blogs',blogSchema);
module.exports = Blog;