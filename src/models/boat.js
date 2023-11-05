const mongose = require("mongoose")


const Schema = mongose.Schema

const boat = new Schema({

    name: String,
    type: String,
    capacity: Number, 
    priceCOP: Number,
    priceUSD:Number,
    size: String,
    descriptionSpanish: String,
    descriptionEnglish:String,
    image:String

})

module.exports = mongose.model("boats", boat)