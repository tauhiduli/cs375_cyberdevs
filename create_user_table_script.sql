/*******************************************************************************************/
/***************************** CREATE USERS TABLE ******************************************/

CREATE TABLE users (

	user_name VARCHAR(30) NOT NULL,
    user_email VARCHAR(30) NOT NULL PRIMARY KEY,
    user_password VARCHAR(30) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);