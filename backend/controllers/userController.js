const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Creating JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
return jwt.sign({id}, process.env.SECRET, {
    expiresIn:maxAge
});
};

// Signup Handler
const signUp = async (req, res) => {
    console.log('req fired')
try {
    const {firstName, lastName, email, password} = req.body;
    const user = await User.create({firstName, lastName, email, password});
    const token = createToken(user._id);
    res.status(201).send({user: user.email, Fname : user.firstName, Lname : user.lastName, token: token});
} catch (error) {
    const err = error.message;
    console.log(err)
    res.status(400).json({error: err})
}
}

// SignIn Handler
const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(201).send({user: user.email, Fname: user.firstName, Lname: user.lastName , token: token});
    } catch (err) {
        const error = err.message;
        console.log(err)
        res.status(400).json({ error : error });
      }
}

module.exports = {signUp, signIn}