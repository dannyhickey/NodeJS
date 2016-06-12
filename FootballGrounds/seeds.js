var mongoose        = require("mongoose");
var FootballGround  = require("./models/footballground");
var Comment         = require("./models/comment");

var data = [
        {
            name: "The Aviva",
            image: "http://kclr96fm.com/media/2015/05/aviva-stadium-interior-north-west-small-2.jpg",
            description: "This is the home stadium for the Republic of Ireland soccer team."
        },
        {
            name: "Villa Park",
            image: "https://s-media-cache-ak0.pinimg.com/736x/1a/c9/2c/1ac92c5b2e52cb911296e60d65334c9f.jpg",
            description: "This is the home stadium for Aston Villa."
        },
        {
            name: "Anfield",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Anfield,_20_October_2012.jpg",
            description: "This is the home stadium for Liverpool."
        }
    ];

function seedDB(){
        //Remove all footballgrounds
        FootballGround.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed footballGrounds!");
                //add a few footballgrounds
                data.forEach(function(seed){
                            FootballGround.create(seed, function(err, footballGround){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("added a footballGround");
                                    //create a comment
                                    Comment.create(
                                        {
                                            text: "A great stadium with a fantastic history.",
                                            author: "Danny"
                                        }, function(err, comment){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                footballGround.comments.push(comment);
                                                console.log(comment);
                                                footballGround.save();
                                                console.log("Created new comment");
                                            }
                                        });
                                }
                            });
                    });
                 }
     });

    
    //add some comments
}

module.exports = seedDB;

