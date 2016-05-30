var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// title
// image
// body
// date created

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server has started!");
});