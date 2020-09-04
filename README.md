- This is our project for CS375 where we will create a Drexel e-commerce site.

- The following are steps to run this locally.

- Citation: the implemented front end is inspired by the following project https://github.com/basir/node-react-ecommerce.

Instructions:
- To run this, you will need to download MySQL. (We used the community server: https://dev.mysql.com/downloads/mysql/ ).

- Once you have that set up, you can use the queries.txt file in the root of the project folder to set up the tables. We used dragonshop as our database name, you can name it whatever you would like.

- Next, add the username, password, and database information in the env.json file located in the app folder.

- You should then go into the app folder and run "npm install". This should add the dependencies listed in the package files.

- You may then run "npm start" which should start up the backend part of the website.

- Now, open up a new terminal window and cd into the frontend folder. Run "npm install" and that should add the dependencies listed in the package files of the frontend folder.

- You may now run "npm start" and that should run the frontend. It should also open up a website on http://localhost:3000/.

- You should be able to see our site now and test it out.