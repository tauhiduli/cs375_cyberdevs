const mysql = require("mysql");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const port = 5000;
const hostname = "localhost";

/* 
 * For the env file, change your user if it is not root
 * and change the password to whatever you set it as.
 */
const env = require("../env.json");
app.use(express.json());

const con = mysql.createConnection({
	host: env.hostname,
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
    
    con.query(sql, [email], function(error, result) {
    	if (error) {
    		return res.status(500).send();
    	}

    	if (result.length === 0) {
    		return res.status(401).send();
    	}

    	console.log(result);
    	res.send();
    });
        // .then(function (response) {
        //     if (response.rows.length === 0) {
        //         // username doesn't exist
        //         return res.status(401).send();
        //     }
        //     let hashedPassword = response.rows[0].hashed_password;
        //     bcrypt
        //         .compare(plaintextPassword, hashedPassword)
        //         .then(function (isSame) {
        //             if (isSame) {
        //                 // password matched
        //                 res.status(200).send();
        //             } else {
        //                 // password didn't match
        //                 res.status(401).send();
        //             }
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             res.status(500).send(); // server error
        //         });
        // })
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
