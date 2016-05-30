var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server has started!");
});