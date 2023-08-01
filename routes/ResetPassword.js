const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post('/', async(req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({where: {email: email}});
    if (!user) return res.json({status: false, message: "Пользователь с такими данными не существует."});
    bcrypt.hash(password, 10).then((hash) => {
        Users.update({password: hash}, {where: {email: req.body.email}})
        res.json({status: true})
    });   
});

module.exports = router;