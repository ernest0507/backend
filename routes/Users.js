const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/", async(req, res) => {
    const {username, email, password} = req.body;
    const user = await Users.findOne({where: {email: email}});
    if (user) return res.json({status: false, message: "Пользователь с такими данным уже существует."});
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            email: email, 
            password: hash
        });
        res.json({status: true})
    });
});


router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email: email}});
    if (!user) return res.json({status: false, message: "Пользователь с такими данным не зарегистрирован."});
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.json({status: false, message: "Неверный пароль."});
        const token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_KEY_JWT);
        res.json({status: true, token: token})
    });
});

module.exports = router;