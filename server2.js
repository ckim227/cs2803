const express = require("express");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const path = require('path');
const bcrypt = require("bcryptjs")// for hashing passwords
const costFactor = 10; // used for the alt
let authenticated = false; // used to see if user is logged in
//CHANGE BACK TO FALSE ^^^
let username = ""; //used to tell which user's data to access

// let's make a connection to our mysql server
const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
     password: "Ca.th2lo",
    //password: "monaco14",
    database: "CS2803"
})

conn.connect(function(err){
    if(err){
        console.log("Error:", err);
    }else{
        console.log("Connection established.")
    }
})

// app will be our express instance
const app = express();
username="ckim"
password="12345"

// Serve static files from the public dir
// if you do not include this, then navigation to the localhost will not show anything
app.use(express.static(path.join(__dirname, 'public'))); // will use the index.html file

// the following is a route
// serve home page
// note that our callback function is anonymous here
app.get("/registration", function(req, res){
    if (authenticated) {
        authenticated = false;
    }
    res.sendFile(__dirname + "/public/html/" + "registration.html");
})


// recall that the login information was passed as a parameter in xhr.send() as a POST request
// the middleware function express.urlencoded must be used for POST requests
// the data will be in the req.body object
app.use(express.urlencoded({extended:false}));

app.post("/register", function(req, res){
    // we check to see if username is available
    usernameQuery = "Select username from registeredUsers where username = ?"
    conn.query(usernameQuery, [req.body.username], function(err, rows){ 
        if(err){
            res.json({success: false, message: "Server Error"})
        }
        // we check to see if the username is already taken
        if (rows.length > 0){
            res.json({success: false, message: "Username already taken! Please try another username"})
        }
        // if it isn't, we insert the user into database
        else{
            // we create a password hash before storing the password
            passwordHash = bcrypt.hashSync(req.body.password, costFactor);
            insertUser = "insert into registeredUsers values(?, ?)"
            conn.query(insertUser, [req.body.username, passwordHash], function(err, rows){
                if (err){
                    res.json({success: false, message: "Server error"})
                }
                else{
                    authenticated = true;
                    res.json({success: true, message: "Welcome " + req.body.username + "!"})
                    username = req.body.username;
                    authenticated = true;
                }
            })
        }
    });
})

app.post("/registerusername", function(req, res){
    // we check to see if username is available
    usernameQuery = "Select username from registeredUsers where username = ?"
    conn.query(usernameQuery, [req.body.username], function(err, rows){ 
        if(err){
            res.json({success: false, message: "Server Error"})
        }
        else if (rows.length > 0){
            res.json({success: false, message: "Username already taken! Please try another username"})
        }
        else {
            res.json({success: true, message: "Valid username!"})
        }
    });
})
app.post("/username", function(req, res){
    // we check to see if username is available
    usernameQuery = "Select username from registeredUsers where username = ?"
    conn.query(usernameQuery, [req.body.username], function(err, rows){ 
        if(err){
            res.json({success: false, message: "Server Error"})
        }
        else if (rows.length > 0){
            res.json({success: true, message: "Username exists!"})
        }
        else {
            res.json({success: false, message: "Username does not exist!"})
        }
    });
})

// post to route "attempt login"
app.post("/attempt_login", function(req, res){
    // we check for the username and password to match.
    conn.query("select username, password from registeredusers where username = ?", [req.body.username], function (err, rows){
        if(err || rows.length === 0){
            authenticated = false;
            res.json({success: false, message: "This username does not exist!"});
        }else{
            storedPassword = rows[0].password // rows is an array of objects e.g.: [ { password: '12345' } ]
            // bcrypt.compareSync let's us compare the plaintext password to the hashed password we stored in our database
            if (bcrypt.compareSync(req.body.password, storedPassword)){
                authenticated = true;
                username = rows[0].username; //username of signed in user is saved
                res.json({success: true, message: "Welcome back " + username + "!"})
            }else{
                res.json({success: false, message:"Your password is incorrect"})
            }
        }
    })  
})

app.post("/saveRandom", function(req,res) {
    //not sure if req.body.recipeName is correct way to get random recipe's name
    conn.query("select user, recipeName from savedRecipes where user = ? and recipeName = ?", [username, req.body.recipeName], function(err,rows){
        if(err){
            res.json({success: false, message: "Server Error"})
            console.log("select err:" + err);
        }
        else if (rows.length > 0){
            res.json({success: false, message: "This recipe has already been saved!"})
        }
        else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy+'-'+mm+'-'+dd;
            //savedRecipes takes in user, recipeName, recipeIngredients, recipeInstructions, accessDate, comment 
            insertUser = "insert into savedRecipes values(?, ?, ?, ?, ?, null)"
            //currently comment set to null

            conn.query(insertUser, [username, req.body.recipeName, req.body.ingredients, req.body.instructions, today], function(err, rows){ 
                if (err){
                    res.json({success: false, message: "Server error"})
                    console.log("insert err:" + err);
                }
                else{
                    res.json({success: true, message: "Recipe successfully saved!"})
                }
            })
        }
    })
})

app.post("/saveLinkedRecipe", function(req,res){
    conn.query("select user, link from linkedrecipes where user = ? and link = ?", [username, req.body.link], function(err, rows){
        if(err){
            res.json({success: false, message: "Server Error"})
        }
        else if (rows.length > 0){
            res.json({success: false, message: "This link has already been uploaded!"})
        }
        else {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy+'-'+mm+'-'+dd;
            //linked recipes take user, recipe name, link, date, and a comment, for now comment = null
            insertUser = "insert into linkedrecipes values(?, ?, ?, ?, null)"
            conn.query(insertUser, [username, req.body.recipeName, req.body.link, today], function(err, rows){ //req.body.recipeName does not exist yet
                if (err){
                    res.json({success: false, message: "Server error"})
                }
                else{
                    res.json({success: true, message: "Recipe successfully uploaded!"})
                }
            })
        }
    })
}) 

// if the user navigates to localhost:3000/main, then the main page will be loaded.
app.get("/main", function(req, res){
    if(authenticated){
        res.sendFile(__dirname + "/public/html/" + "main.html");
    }else{
        res.send("<p>not logged in <p><a href='/'>login page</a>")
    }
    
})

app.get("/randomRecipe", function(req,res) {
    if(authenticated){
        res.sendFile(__dirname + "/public/html/" + "randomRecipe.html")
    }else{
        res.send("<p>Not logged in <p><a href='/'>login page</a>")
    }
})

app.get("/uploadRecipe", function(req,res) {
    if(authenticated){
        res.sendFile(__dirname + "/public/html/" + "uploadRecipe.html")
    }else{
        res.send("<p>Not logged in <p><a href='/'>login page</a>")
    }
})

// Start the web server
// 3000 is the port #
// followed by a callback function
app.listen(3000, function() {
   console.log("Listening on port 3000...");
});