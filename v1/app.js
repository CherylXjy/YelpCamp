var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

//schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "creek111", 
//         image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly created campground");
//         }
//     }
// );

// var campgrounds = [
//         {name: "creek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "HIll decreek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "creek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "HIll decreek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "creek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "HIll decreek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"},
//         {name: "cewrejoprwreek", image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzQxMzIzMjY3N15BMl5BanBnXkFtZTcwMDMzMjM1MQ@@._V1_SX300.jpg"}
//     ];

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

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

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var image = req.body.image;
    var name = req.body.name;
    var newCampground = {name: name, image: image};
    
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


app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp started");
});