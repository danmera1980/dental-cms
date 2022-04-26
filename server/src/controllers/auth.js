const { User } = require("../db");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwtGenerator = require('../utils/jwtGenerator');

const registerUser = async (req, res, next) => {
    try {
        const {username, name, lastName, email, password, phone, img} = req.body;
        const user = await User.findAll({
            where: {email: email}
        });
        
        if(user.length !== 0){
            return res.status(401).send("User already exists")
        }
        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            id: uuidv4(),
            username: username,
            name: name,
            lastName: lastName,
            passwordHash: bcryptPassword,
            email: email,
            phone: phone===undefined?null:phone,
            img: img===undefined?null:img,
            isAdmin: false,
            isActive: true
        });

        const token = await jwtGenerator(newUser.id);
        res.status(200).json({token})

    } catch (error) {
        console.log(error.message);
        res.status(500).send(`Server error = ${error.message}`)
    }
};

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    
    if(user === null){
        return res.status(401).json("Email or Password is incorrect.")
    };

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    
    if(!validPassword){
        return res.status(401).json("Email or Password is incorrect.")
    }

    const token = jwtGenerator(user.id)

    res.status(200).send({ token })
}

const verify = async (req, res, next) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`Server error = ${error.message}`)
    }
}

module.exports = {
    registerUser,
    loginUser,
    verify
  };