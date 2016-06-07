var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    FootballGround  = require("./models/footballground"),
    seedDB          = require("./seeds");
    // Comment         = require("./models/comment"),
    // User            = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/football_grounds");




// FootballGround.create(
//         {
//             name: "Villa Park",
//             image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Villa_Park.jpg",
//             description: "This is the mighty villa park!"
//         }, function(err, grounds)
//         {
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log("Created new footballGround");
//                 console.log(grounds);
//             }
//         }
//     );

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");//allows node to render pages without needing to write ejs extension 

app.get("/", function(req, res){
    res.render("index");
});

//INDEX - shows all football grounds
app.get("/footballGrounds", function(req, res){
    //Get all footballGrounds from DB
    FootballGround.find({}, function(err, grounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {footballGrounds: grounds});
        }
    });
});

app.post("/footballGrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newFootballGround = {name: name, image: image, description: desc};
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

//SHOW - shows more info about one football ground.
app.get("/footballGrounds/:id", function(req, res) {
    FootballGround.findById(req.params.id, function(err, foundFootballGround){
        if(err){
            console.log(err);
        }else{
            res.render("show", {footballGround: foundFootballGround});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Football Grounds server has started!");
});