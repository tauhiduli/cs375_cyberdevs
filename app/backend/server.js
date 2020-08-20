const mysql = require("mysql");
const express = require("express");
const app = express();

const port = 5000;
const hostname = "localhost";

/* 
 * For the env file, change your user if it is not root
 * and change the password to whatever you set it as.
 */
const env = require("../env.json");

const con = mysql.createConnection({
	host: env.hostname,
	user: env.user,
	password: env.password
});

con.connect(function(error) {
	if (error) {
		console.log("Error: ", error);
	}
	else {
		console.log("Connected to database!");
	}
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
