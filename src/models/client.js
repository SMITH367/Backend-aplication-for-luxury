const mongose = require("mongoose")


const Schema = mongose.Schema

const client = new Schema({
    name: String,
    identification:String,
    email: String,
    phoneNumber:String
})
module.exports = mongose.model("clients", client)