import data from "./data.js";

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const port = 5000;
const hostname = "localhost";

let saltRounds = 12;

/* 
 * For the env file, change your user if it is not root
 * and change the password to whatever you set it as.
 */

app.get("/api/products/:id",(req,res)=>{
	const productId=req.params.id
	const product = data.products.find(x=>x._id === productId)
	if(product){
		res.send(product)
	}else{
		res.status(404).send({msg:"Product Not Found"})
	}
})
 app.get("/api/products",(req,res)=>{
	 res.send(data.products);
 })

const env = require("../env.json");
app.use(express.json());

const con = mysql.createConnection({
	host: env.host,
	user: env.user,
	password: env.password,
	database: env.database,
});

con.connect(function(error) {
	if (error) {
        console.log("Error: ", error);
	}
	else {
		console.log("Connected to database!");
	}
});

// Checks if the user is exists and validates their credentials
app.post("/auth", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let sql = "SELECT * FROM users WHERE email = ?";
    // This will be sent back if the email or password is wrong
    let error401Msg = {msg: "Invalid Email or Password!"}
    
    // check if the email exists in the database
    con.query(sql, [email], function(error, result) {
    	if (error) {
            console.log(error);
    		return res.status(500).send();
    	}

    	if (result.length === 0) { // check if the email does not match in the database
            console.log("User Does Not Exist!");
    		return res.status(401).send(error401Msg);
    	}

        // Set some vars containing data that will be returned or checked later
        let r = result[0];
        let db_email = r.email;
        let db_password = r.password;
        let db_firstName = r.firstName;
        let db_lastName = r.lastName;
        let db_username = r.username;

        // compare the password to that of in the database
        bcrypt
        .compare(password, db_password)
        .then(function(isSame) {
            if (isSame) {
                console.log("It's good");
                res.send({
                    email: db_email, 
                    firstName: db_firstName, 
                    lastName: db_lastName, 
                    username: db_username
                });
            }
            else {
                console.log("Not good");
                res.status(401).send(error401Msg);
            }
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send();
        });
    });
});

// This will add a new user to the database
app.post("/addUser", function (req, res) {    
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;

    // check email input
    if (
        !req.body.hasOwnProperty("email") ||
        typeof email !== "string" ||
        email.length < 3
    ) {
        console.log("Invalid Email!");
        return res.status(401).send({msg: "Invalid Email!"});
    }

    // check password input
    if (
        !req.body.hasOwnProperty("password") ||
        typeof password !== "string" ||
        password.length < 8
    ) {
        console.log("Invalid Password!");
        return res.status(401).send({msg: "Invalid Password! Passwords must be at least 8 characters long!"});
    }

    // check first name input
    if (
        !req.body.hasOwnProperty("firstName") ||
        typeof firstName !== "string" ||
        firstName.length < 1
    ) {
        console.log("Invalid First Name!");
        return res.status(401).send({msg: "Invalid First Name!"});
    }

    // check last name input
    if (
        !req.body.hasOwnProperty("lastName") ||
        typeof lastName !== "string" ||
        lastName.length < 1
    ) {
        console.log("Invalid Last Name!");
        return res.status(401).send({msg: "Invalid Last Name!"});
    }

    // check username input
    if (
        !req.body.hasOwnProperty("username") ||
        typeof username !== "string" ||
        username.length < 2
    ) {
        console.log("Invalid Username!");
        return res.status(401).send({msg: "Invalid Username! Username must be at least 2 characters long!"});
    }

    let sql = "SELECT id, username, email FROM users WHERE email = ? OR username = ?";

    // check if email or username already exists in the database
    con.query(sql, [email, username], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send();
        }

        if (result.length > 0) { // check if the database returns rows containing the email or username
            console.log("Exists!");
            for (let i=0; i<result.length; i++) { // loop through the rows to see which one exists
                if (result[i].email === email) { // check if the email exists
                    console.log("Email Exists!");
                    return res.status(401).send({msg: "This email already exists! Please sign in instead!"});
                }
                else { // otherwise, the username exists
                    console.log("Username Exists!");
                    return res.status(401).send({msg: "This username already exists!"});
                }
            }
        }

        bcrypt
        .hash(password, saltRounds)
        .then(function(hashedPassword) {
            sql = "INSERT INTO users SET firstName = ?, lastName = ?, username = ?, email = ?, password = ?";

            // Insert into the database
            con.query(sql, [firstName, lastName, username, email, hashedPassword], function(error, result) {
                if (error) {
                    console.log(error);
                    return res.status(500).send();
                }
                // Get the inserted row and return the data
                sql = "SELECT email, firstName, lastName, username FROM users WHERE id = ?";
                con.query(sql, [result.insertId], function(error, result) {
                    if (error) {
                        console.log(error);
                        return res.status(500).send();
                    }
                    let r = result[0];
                    res.send({
                        email: r.email, 
                        firstName: r.firstName, 
                        lastName: r.lastName, 
                        username: r.username
                    });
                });
            });
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send();
        });
    });
    
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
