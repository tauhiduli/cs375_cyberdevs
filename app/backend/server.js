import data from "./data"

const mysql = require("mysql");
const express = require("express");
const app = express();

const port = 5000;
const hostname = "localhost";

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
/*
const env = require("../env.json");

const con = mysql.createConnection({
	host: env.host,
	user: env.user,
	password: env.password
});

con.connect(function(error) {
	if (error) {
		console.log("asdfasdfadadf")
		console.log("Error: ", error);
	}
	else {
		console.log("Connected to database!");
	}
});
*/
app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
