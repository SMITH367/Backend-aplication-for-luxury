const express = require('express')
const router = express.Router()
const boat = require("../models/boat")
const verifyToken = require('../Auth/verifyToken')
const jwt = require('jsonwebtoken')
const database = require("../database")



//Getting all routes
router.get('/boats', async (req, res) => {
    const boats = await boat.find()
    res.send(boats)
})

//Getting an indiviual route
router.get('/boats/:boat', async (req, res) => {
    
    const getBoat = await boat.findOne({
        "name": req.params.boat
    })
    res.send(getBoat)
})

router.post('/boats/create', verifyToken, (req, res) => {
    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send(err);
        } else {
           

        const boatData = {

            name:req.body.name,            
            type: req.body.type,
            capacity: req.body.capacity, 
            priceCOP: req.body.priceCOP,
            priceUSD:req.body.priceUSD,
            size: req.body.size,
            descriptionSpanish: req.body.descriptionSpanish,
            descriptionEnglish:req.body.descriptionEnglish,
            image:req.body.image

        }

        const newBoat = new boat(boatData)
        await newBoat.save()
        
        res.sendStatus(200)

        }
    })
})

router.put('/boats/update/:boat', verifyToken, (req, res) => {
    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send(err);
        } else {

            let newData = req.body

            const updateBoat = await boat.updateOne({
                name: req.params.boat
            }, newData)

            res.sendStatus(200)
        
        }
    })
})

router.delete('/boats/:name', verifyToken, (req, res) => {

    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send(err);
        } else {
            
            const deleteBoat = await boat.deleteOne({
                name: req.params.name,
            })

            res.sendStatus(200)
        }
    })
})



module.exports = router