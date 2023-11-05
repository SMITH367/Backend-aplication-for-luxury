const mongose = require("mongoose")

const Schema = mongose.Schema

const cotization = new Schema({

    clientName: String,
    clientIdentification: String,
    clientEmail:String,
    clientPhoneNumber:String,
    boat: String,
    totalCotization: Number,
    cotizationDate: String,
    solicitationDate:String,
    participatingPeople:Number

})

module.exports = mongose.model("cotizations", cotization)