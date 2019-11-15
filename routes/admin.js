var express = require("express");
var adminrouter = express();

adminrouter.get("/",function(req,res)
{
    res.send("All Admin");
});

adminrouter.get("/:No",function(req,res)
{
    res.send("Admin No " + req.params.No);
});


adminrouter.post("/",function(req,res)
{
    res.send("Admin No ");
});

module.exports = adminrouter;