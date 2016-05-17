var express = require("express");
var app = express();

app.set("view engine", "ejs");//allows node to render pages without needing to write ejs extension 

app.get("/", function(req, res){
    res.render("index");
});

app.get("/footballGrounds", function(req, res) {
    var footballGrounds = [
        {
            name: "Villa Park",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/VillaPark_PanoramaFromTrinityRoadStand.jpg"
        },
        
        {
            name: "Anfield",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Anfield,_20_October_2012.jpg"
        },
        
        {
            name: "The Emirates",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Emirates_Stadium_-_East_side_-_Composite.jpg"
        }
        ];
        res.render("footballGrounds", {footballGrounds: footballGrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp has started!");
});