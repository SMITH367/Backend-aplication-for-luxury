const mongose = require("mongoose")


const Schema = mongose.Schema

const user = new Schema({
    name: String,
    password: String, 
    email: String
})
module.exports = mongose.model("users", user)