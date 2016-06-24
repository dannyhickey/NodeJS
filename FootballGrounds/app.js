var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    FootballGround  = require("./models/footballground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment");
    // User            = require("./models/user");


mongoose.connect("mongodb://localhost/football_grounds");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");//allows node to render pages without needing to write ejs extension 
app.use(express.static(__dirname + "/public"));
seedDB();

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
            res.render("footballGrounds/index", {footballGrounds: grounds});
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
            res.redirect("/footballGrounds/");
        }
    });
});

app.get("/footballGrounds/new", function(req, res) {
   res.render("footballGrounds/new"); 
});

//SHOW - shows more info about one football ground.
app.get("/footballGrounds/:id", function(req, res) {
    FootballGround.findById(req.params.id).populate("comments").exec(function(err, foundFootballGround){
        if(err){
            console.log(err);
        }else{
            console.log(foundFootballGround);
            res.render("footballGrounds/show", {footballGround: foundFootballGround});
        }
    });
});

//==============================================================
//Comments Routes
//==============================================================

app.get("/footballGrounds/:id/comments/new", function(req, res) {
    //find footballGround by Id
    FootballGround.findById(req.params.id, function(err, footballGround){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new", {footballGround: footballGround});
       }
    });
});

app.post("/footballGrounds/:id/comments", function(req, res){
   //lookup footballGround using the ID
   FootballGround.findById(req.params.id, function(err, footballGround) {
       if(err){
           console.log(err);
           res.redirect("/footballGrounds")
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   footballGround.comments.push(comment);
                   footballGround.save();
                   res.redirect('/footballGrounds/' + footballGround._id);
               }
           });
       }
   });
 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Football Grounds server has started!");
});