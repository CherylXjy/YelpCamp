var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
// var seedDB = require("./seeds");


// seedDB();

// var Comment = require("./models/comment");
// var User = require("./models/user");

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://jiayi:123456@ds117909.mlab.com:17909/yelpcamp");

//schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // res.render("campground",{campgrounds: campgrounds});
    //get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } 
       else{
           res.render("campground",{campgrounds: campgrounds});
       }
    });
});



//CREATE - create new campground
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var image = req.body.image;
    var name = req.body.name;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc};

    
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       }
       else{
           //redirect
           res.redirect("/campgrounds");
       }
    });
    //redirect
    // res.redirect("/campgrounds");
});


//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp started");
});