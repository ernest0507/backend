const express = require("express");
const router = express.Router();
const { Links } = require('../models')

router.get('/', async(req, res) => {
    const listOfLinks = await Links.findAll()
    res.json(listOfLinks)
})

router.get('/byId/:id', async(req, res) => {
    const id = req.params.id
    const link = await Links.findByPk(id)
    res.json(link)
})


module.exports = router;