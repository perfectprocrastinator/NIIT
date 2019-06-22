var express                  =  require('express');
    app                      =  express();
    passport                 =  require('passport');
    bodyparser               =  require('body-parser');
    LocalStrategy            =  require('passport-local');
    passportLocalMongoose    =  require('passport-local-mongoose');
    mongoose                 =  require('mongoose');
    User                     =  require('./models/user');
mongoose.connect("mongodb://localhost/NIIT");
app.set("view engine","ejs");
app.use('/public',express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"NIIT is a global learning outsourcing company",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));




//==========
//ROUTES
//======

app.get('/',function (req,res) {
res.render("home");
})
app.get('/niit',isLoggedIn,function (req,res) {
    //add islogged in function as middleware so that secret page is accessed only if
    //usr is logged in and not directly through url
    //befor rendering secret isLogged in is called and upon calling
    //it if it returns next then only next function is called to render secret page
    res.render("niit");

})


//AUTH ROUTES




//showing signup form
app.get('/register',function (req,res) {
    res.render("register");

} )
//handling user signup
app.post('/register',function (req,res) {
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function (err,use) {
    if(err){
        console.log(err);
        res.render('register')
    }
    //Now following line logs the user in
        //  OR in future passport.authenticate("twitter")(req,res,function () {

            passport.authenticate("local")(req,res,function () {
        res.redirect('/niit');

    })
    });

    

})

//LOGIN ROUTES
// render login form
app.get("/login",function (req,res) {
    res.render('login');

})
//login logic
//middleware
app.post('/login', passport.authenticate("local",{
    successRedirect:"/niit",
    failureRedirect:"/login"
}) ,function (req,res) {
});
app.get('/logout',function (req,res) {
    req.logout();
    res.redirect('/');
    
})
//Adding a fn so that we cannot access secret page directly through url

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}
app.listen('7275',function (err,res) {
    if(err)
        console.log(err);
    else
        console.log("server started on port 7275");
})
