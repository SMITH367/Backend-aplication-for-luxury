const express = require('express')
const router = express.Router()
const user = require('../models/users')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Auth/verifyToken')
const bcryptjs = require('bcryptjs')
const database = require("../database")



//Getting all users
router.get('/user', async (req, res) => {
    const viewUser = await user.find()
    res.send(viewUser)
})

// Getting user data
router.get('/user/:email', async (req, res) => {
    const viewUser = await user.find({
        email: req.params.email
    }, {
        "password": 0,
        "_id": 0
    })
    res.send(viewUser)
})


//Creating a new user
router.post('/user', async (req, res) => {

    const viewUser = await user.find({
        email: req.body.email
    })
    if (viewUser.length === 0) {

        let passwordHash = await bcryptjs.hash(req.body.password, 8)
        const userData = {
            name: req.body.name,
            password: passwordHash,
            email: req.body.email
        }


        const newUser = new user(userData)
        await newUser.save()
        res.json({
            "added": "true"
        })
    } else {
        res.send({
            "added": "false"
        })
    }
})

// Updating an username

router.put('/username/:id', verifyToken, (req, res) => {

    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send("err");
        } else {
            const newData = {
                name: req.body.name
            }
            const updateUser = await user.updateOne({
                email: req.params.id
            }, newData)
            res.send(updateUser.acknowledged)
        }
    })
})

// updating the password

router.put('/userpassword/:id', verifyToken, (req, res) => {
    jwt.verify(req.auth, 'secretKey', async (err, data) => {
        if (err) {
            res.send("err");
        } else {
            const verify = await user.findOne({
                email: req.params.id
            })

            const passwordValidation = bcryptjs.compareSync(req.body.password, verify.password)

            let passwordHash = await bcryptjs.hash(req.body.newPassword, 8)
            if (passwordValidation) {
                const newData = {
                    password: passwordHash
                }
                const updateUser = await user.updateOne({
                    email: req.params.id
                }, newData)
                res.send(updateUser.acknowledged)
            } else {
                res.sendStatus(403)
            }

        }
    })
})


//Login sistem
router.post('/login', async (req, res) => {


    const viewUser = await user.find({
        email: req.body.email
    })

    const passwordUser = viewUser[0].password
    const passwordTry = req.body.password

    const passwordValidation = bcryptjs.compareSync(passwordTry, passwordUser)

    if (viewUser.length > 0 && passwordValidation === true) {
        const user = {
            id: 1
        }
        jwt.sign({
            user
        }, 'secretKey', (err, token) => {

            if (err) return err

            const dataUser = {
                name: viewUser[0].name,
                email: viewUser[0].email,
                accessToken: token
            }
            res.json(dataUser);

        })
    } else {
        res.sendStatus(403)
    }

})

module.exports = router
