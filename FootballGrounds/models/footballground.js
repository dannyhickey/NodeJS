var mongoose = require("mongoose");

var footballGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


module.exports = mongoose.model("FootballGround", footballGroundSchema);