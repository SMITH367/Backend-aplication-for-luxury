const express = require('express')
const router = express.Router()
const verifyToken = require('../Auth/verifyToken')
const jwt = require('jsonwebtoken')
const cotization = require("../models/cotization")
const client = require("../models/client")

const database = require("../database")


//Getting all cotizations
router.get('/cotizations', verifyToken, (req, res) => {
    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const cotizations = await cotization.find()
            res.send(cotizations)
        }
    })
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

    const dataClient = {
        name: req.body.clientName,
        identification: req.body.clientIdentification,
        email: req.body.clientEmail,
        phoneNumber: req.body.clientPhoneNumber,
    }

    const newUser = new client(dataClient)

    await newCotization.save()

    const validateClient = await client.findOne({
        "email":req.body.clientEmail
    })

    if(validateClient === null)
        await newUser.save()

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