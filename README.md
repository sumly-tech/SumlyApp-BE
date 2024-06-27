**Introduction**

This project is a RESTful API built with Node.js and Express that interacts with a MySQL database. It provides endpoints for creating, reading, updating, and deleting (CRUD) data.

**Features**

RESTful API following best practices
CRUD operations for managing data
MySQL database integration
Input validation
Error handling
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (version 18 or later)

npm (version 10 or later)

MySQL (version 5.7 or later)




**Installation**

Clone the repository:

```sh
git clone https://github.com/sumly-tech/SumlyApp-BE.git
```

```sh
cd SumlyApp-BE
```


**Install dependencies:**
```sh
npm install
```
Set up the MySQL database:


```sh
CREATE DATABASE sumly_db;
```
Import the database schema (if provided):

```sh
mysql -u root -p sumly_db < schema.sql
```

Create below folders under root directory
```sh
mkdir logs
chmod 777 logs
mkdir uploads
mkdir uploads/temp
chmod 777 uploads
``` 

**Configuration**

Open the .env file, update the database configuration, port and checkbook credentials:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=sumly_db




**Running the Application**

Start the development server:
```sh
npm start
```
The server will be running at http://localhost:{PORT SPECIFIED ON .env FILE}.



**API Endpoints**

Here are some of the main endpoints available in this API:

https://docs.google.com/spreadsheets/d/1ZK1zNFWr3qNJnB25DkL8RHPVJbp9E2PdedZvO4RC2aI/edit?usp=sharing


SumlyApp-BE/



src/config/seq_db.js: Database connection configuration

src/controllers: All the controller files

src/models: Model definition

src/config/routes.js: Routes definition

app.js: Entry point to start the server and express app configuration

