var express = require('express');
var app = express();
//STEP 3: Setup bootstrap
const path = require("path")
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)

//STEP 4: Setup DB and DB collection
var mongoose = require('mongoose');
var dbUrl = "mongodb+srv://masonDouglas:superpassword@cluster0.i4b1t.mongodb.net/realchat"
var Message = mongoose.model('message',{ username : String, message : String})
mongoose.connect(dbUrl , (err) => { 
  if (err == null)
    console.log('mongodb connected');
  else
  console.log('mongodb connected',err);
})



app.use(express.static(__dirname));

var server = app.listen(3000, () => {
    console.log('The app is runing on the url localhost:', server.address().port);
   });