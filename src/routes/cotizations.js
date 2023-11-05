const express = require('express')
const router = express.Router()
const verifyToken = require('../Auth/verifyToken')
const jwt = require('jsonwebtoken')
const cotization = require("../models/cotization")

const database = require("../database")


//Getting all cotizations
router.get('/cotizations', async (req, res) => {
    const cotizations = await cotization.find()
    res.send(cotizations)
})

//Searching a cotization
router.get('/cotizations/:cotization', async (req, res) => {

    const cotizationData = await cotization.findOne({
        _id: req.params.cotization
    })

    res.send(cotizationData)
})


router.post('/cotizations/create', async (req, res) => {

    const newCotization = new cotization(req.body)
    await newCotization.save()
    res.sendStatus(200)

})


router.delete('/cotizations/:cotization', verifyToken, (req, res) => {

    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const deleteCotization = await cotization.deleteOne({
                _id: req.params.cotization,
            })
            res.sendStatus(200)
        }
    })
})


module.exports = router