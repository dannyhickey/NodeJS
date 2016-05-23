var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/football_grounds");

var footballGroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var FootballGround = mongoose.model("FootballGround", footballGroundSchema);

/*FootballGround.create(
        {
            name: "Nowhere Park",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Villa_Park.jpg"
        }, function(err, grounds)
        {
            if(err){
                console.log(err);
            }else{
                console.log("Created new footballGround");
                console.log(grounds);
            }
        }
    );*/

/*  var footballGrounds =  
    [
        {
            name: "Villa Park",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Villa_Park.jpg"
        },
        
        {
            name: "Anfield",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Anfield,_20_October_2012.jpg"
        },
        
        {
            name: "The Emirates",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Emirates_Stadium_-_East_side_-_Composite.jpg"
        },
        
        {
            name: "Villa Park",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Villa_Park.jpg"
        },
        
        {
            name: "Anfield",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Anfield,_20_October_2012.jpg"
        },
        
        {
            name: "The Emirates",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Emirates_Stadium_-_East_side_-_Composite.jpg"
        },
        
        {
            name: "Villa Park",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Villa_Park.jpg"
        },
        
        {
            name: "Anfield",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Anfield,_20_October_2012.jpg"
        },
        
        {
            name: "The Emirates",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Emirates_Stadium_-_East_side_-_Composite.jpg"
        }
    ];*/


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");//allows node to render pages without needing to write ejs extension 

app.get("/", function(req, res){
    res.render("index");
});

app.get("/footballGrounds", function(req, res){
    //Get all footballGrounds from DB
    FootballGround.find({}, function(err, grounds){
        if(err){
            console.log(err);
        }else{
            res.render("footballGrounds", {footballGrounds: grounds});
        }
    });
});

app.post("/footballGrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newFootballGround = {name: name, image: image};
    FootballGround.create(newFootballGround, function(err, newAdded){
        if(err){
            console.log(err);
        }else{
            res.redirect("/footballGrounds");
        }
    });
});

app.get("/footballGrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Football Grounds server has started!");
});