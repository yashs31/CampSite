var Campground=require("../models/campground");
var Comment=require("../models/comment");
//all the middleware goes here
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){

    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back");
            }
            else {
                //does user own campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error","You dont have permission to do that");
                    res.redirect("back");
                }

            }
        });
    }
    else {
        req.flash("error","You dont have permission to do that");
        res.redirect("back");
    }

}

middlewareObj.checkCommentOwnership=function(req,res,next){
    
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    res.redirect("back");
                }
                else{
                    //does user own comment
                    if(foundComment.author.id.equals(req.user._id)){        //cannot do === coz one will be string and other is id
                        next();
                    }
                    else{
                        req.flash("error","No permission to do that");
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else{
            res.redirect("back");
        }
}   

middlewareObj.isLoggedIn=function(req,res,next){
    //middleware
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in ");           //error-key , other is message
    res.redirect("/login");
}

module.exports=middlewareObj;