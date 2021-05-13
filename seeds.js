var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {
        name:"Cloud's Rest",
        image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat, accusantium corrupti reprehenderit illo sapiente sit explicabo inventore iure facilis vel enim suscipit! Beatae nulla in voluptatibus iusto iste adipisci doloremque nam a facere tenetur magni, voluptatem magnam voluptates omnis."
    },
    {
        name:"Desert Sun",
        image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat, accusantium corrupti reprehenderit illo sapiente sit explicabo inventore iure facilis vel enim suscipit! Beatae nulla in voluptatibus iusto iste adipisci doloremque nam a facere tenetur magni, voluptatem magnam voluptates omnis."
    },
    {
        name:"Mountain Creek",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugiat, accusantium corrupti reprehenderit illo sapiente sit explicabo inventore iure facilis vel enim suscipit! Beatae nulla in voluptatibus iusto iste adipisci doloremque nam a facere tenetur magni, voluptatem magnam voluptates omnis."
    }
]
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        //add few campground
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    
                    //create comments
                    Comment.create(
                        {
                            text:"place is great but no internet",
                            author:"xyz"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    )
                }
            });
        });
    });
}
module.exports=seedDB;