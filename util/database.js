const mysql = require('mysql');

exports.pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const values = [
//     ['John', 'Highway 71'],
//     ['Peter', 'Lowstreet 4'],
//     ['Amy', 'Apple st 652'],
//     ['Hannah', 'Mountain 21'],
//     ['Michael', 'Valley 345'],
//     ['Sandy', 'Ocean blvd 2'],
//     ['Betty', 'Green Grass 1'],
//     ['Richard', 'Sky st 331'],
//     ['Susan', 'One way 98'],
//     ['Vicky', 'Yellow Garden 2'],  
//     ['Ben', 'Park Lane 38'],
//     ['William', 'Central st 954'],
//     ['Chuck', 'Main Road 989'],
//     ['Viola', 'Sideway 1633']
//   ];

// const instance = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "mysql",
//     database: 'test'
// });

// instance.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     //const adr = 'Mountain 21', name = 'Amy';
//     const sqlQuery = 'select * from customers limit 2, 5';//Shorter syntax - Limit the number of records from the returned query starting at 2nd position - The numbers are reversed: "LIMIT 2, 5" is the same as "LIMIT 5 OFFSET 2"
//     //'select * from customers limit 5 offset 2'; //Limit the number of records from the returned query starting at 2nd position
//     //'select * from customers limit 5'; //Limit the number of records from the returned query
//     //'update customers set address = "London" where address = "Green Grass 1"' //Update
//     //'drop table if exists customers';//Delete the table if it exists
//     //'drop table customers';//Delete table
//     //'delete from customers where address = "Mountain 21"';//Delete record
//     //'select * from customers order by name desc';//Order by desc
//     //'select * from customers order by name'; //Order by asec
//     //`select * from customers where name = ? OR address = ?` //Placeholders for dymnamic query values
//     //`select * from customers where address = ${mysql.escape(adr)}`; //Placeholders for dymnamic query values
//     //"select * from customers where address like 's%'"; ////Get specific row
//     //"SELECT * from customers where address='kolhapur'"; //Get specific row
//     //"SELECT name, address FROM customers"; //Get all rows
//     //"INSERT INTO customers (name, address) VALUES ?"; //Insert multiple data
//     //"INSERT INTO customers (name, address) VALUES ('Aishwarya', 'Kolhapur')"; //Insert specific record
//     //"ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
//     //"CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//     //"CREATE DATABASE test";//Create database
//     instance.query(sqlQuery, [values],(dberr, result, fields)=>{
//     //instance.query(sqlQuery, [name, adr],(dberr, result, fields)=>{
//         if(dberr){
//             throw dberr;
//         }
//         //console.log(result.affectedRows);
//         console.log(result);
//     })
//     console.log('DB connected!');  
// });



