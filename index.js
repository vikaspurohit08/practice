var express = require("express");
var adminrouter = require("./routes/admin");
var emprouter = require("./routes/emp");
var config = require("config");
var app = express();

const port = parseInt(config.get("port"));

app.use(function(req,res,next){
      res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

})
app.use(express.json());
app.use("/admin", adminrouter);
app.use("/emp", emprouter);

app.listen(port, function(){
console.log("Server Started on port " + port);
});
