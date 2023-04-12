const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes')
const blogRoutes = require('./routes/blogRoutes')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Avoiding a warning
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cors())
app.use(userRoutes)
app.use(blogRoutes)

const port = process.env.PORT;
const uri = process.env.URI;  
console.log("Port => ", port);

mongoose.connect(uri).then(app.listen(port, ()=> {
    console.log(`Server started at port : ${port}`);
    console.log('Successfully connected to Database');
})
).catch((err) => console.log(err));
