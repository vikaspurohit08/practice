var express = require("express");
var mysql = require("mysql");
var Joi = require("joi");
var emprouter = express();

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "php"
});

var data= [];

conn.connect();


// function validate(content)
// {
//     const schema = {
//         "ename" : Joi.string().required(),
//         "salary" : Joi.required()
//     };
//     return Joi.validate(content,schema);
// }


emprouter.post("/", function(req,res){

// let valid = validate(req.body);
// console.log(valid);

// if(valid.error == null)
// {

let ename = req.body.ename;
let salary = req.body.salary;

let query = `insert into emp(ename,salary) values( '${ename}' , '${salary}' )`;


conn.query(query, function( err , sol ){

    if(err == null)
    {
        res.contentType("application/json");
        res.send(JSON.stringify(sol));
        
    }
    else
    {
        res.contentType("application/json");
        res.send(JSON.stringify(err));
    }
});


// else
// {
//     res.contentType("application/json");
//     res.send(JSON.stringify(valid));
// }
});






emprouter.get("/", function(req , res){

conn.query("select * from emp" , function(err,sol){

if(err == null)
{
    data = sol;
    res.contentType("application/json");
    res.send(JSON.stringify(data));
    
}
else
{
    res.contentType("application/json");
    res.send(JSON.stringify(err));
}

});


});


// emprouter.get("/:empno", function(request, response){
//     console.log("You searched for " + request.params.empno);
//     var empSearched= data[parseInt(request.params.empno) - 1];
//     response.contentType("application/json");
//     response.send(empSearched);
// });


emprouter.get("/:empno", function(request, response){
    console.log("You searched for " + request.params.empno);
    
    conn.query(`select * from emp where empno =${request.params.empno}`, function(err, result){
        if(err==null)
        {
           data =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(data));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});


emprouter.put("/:empno", function(req , res){
    let empno = parseInt(req.params.empno);
    let ename = req.body.ename;
    let salary = req.body.salary;

    let query = `update emp set ename = '${ename}' , salary = '${salary}' where empno= '${empno}'  `;
    conn.query(query, function(err,result){

        if(err == null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else
        {
            res.contentType("application/json");
             res.send(err);
             
         }

     });
    });



emprouter.delete("/:empno", function(req , res){
    let empno = parseInt(req.params.empno);
    let query = `delete from emp where empno= '${empno}' `;
    
    conn.query(query, function(err,result){

        if(err == null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else
        {
            res.contentType("application/json");
             res.send(err);
             
          }


 });

});




module.exports = emprouter;
