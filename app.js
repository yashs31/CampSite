var express    =    require("express");
var app        =    express();
var bodyParser =    require("body-parser");
var mongoose   =    require("mongoose");
var flash      =    require("connect-flash");
var passport   =    require("passport");
var LocalStrategy=  require("passport-local");
var methodOverride= require("method-override");
var Campground =    require("./models/campground");
var Comment    =    require("./models/comment");
var User       =    require("./models/user");
var seedDB     =require("./seeds");

//requiring routes
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });      //connect to yelp_camp DB
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))              //use css sheet
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();                                                //seed database 

//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"mactavish is great",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){         //calls this func in all routes
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");        
    res.locals.success=req.flash("success");   
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);   //removes all /campgrounds in the campgrounds routes as this statement will append it to all routes in campgrounds
app.use("/campgrounds/:id/comments",commentRoutes);

// app.listen(3000, function () {
//     console.log("YelpCamp server has started");
// });

app.listen(process.env.PORT || 3000, function () {
    console.log("YelpCamp server has started");
});