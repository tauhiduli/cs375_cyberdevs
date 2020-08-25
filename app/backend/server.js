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

app.post("/auth", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let sql = "SELECT password FROM users WHERE email = ?";
    
    // check if the email exists in the database
    con.query(sql, [email], function(error, result) {
    	if (error) {
            console.log(error);
    		return res.status(500).send();
    	}

    	if (result.length === 0) {
    		return res.status(401).send();
    	}

        let db_password = result[0].password;

        // compare the password to that of in the database
        bcrypt
        .compare(password, db_password)
        .then(function(isSame) {
            if (isSame) {
                res.send();
            }
            else {
                res.status(401).send();
            }
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send();
        });
    });
});

app.post("/addUser", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    // check inputs
    if (
        !req.body.hasOwnProperty("email") ||
        !req.body.hasOwnProperty("password") ||
        !req.body.hasOwnProperty("firstName") ||
        !req.body.hasOwnProperty("lastName") ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        email.length < 3 ||
        password.length < 8 ||
        firstName.length < 1 ||
        lastName.length < 1
    ) {
        res.status(401).send();
    }

    let sql = "SELECT username FROM users WHERE username = ?";

    // check if email already exists in the database
    con.query(sql, [email], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send();
        }

        if (result.length > 0) {
            return res.status(401).send();
        }

        bcrypt
        .hash(password, saltRounds)
        .then(function(hashedPassword) {
            sql = "INSERT INTO users SET firstName = ?, lastName = ?, email = ?, password = ?";

            con.query(sql, [firstName, lastName, email, hashedPassword], function(error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).send();
                }
                else {
                    res.send();
                }
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
