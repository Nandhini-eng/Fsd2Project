var express = require("express");
var app = express(); //include the module .this give us the capability the read the body.

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//users=['bhanu:123']

app.post("/login", function (request, response) {
  let user1 = request.body.username;
  let passwd = request.body.password;
  if(!user1) {
      response.status(400).json("enter username");
// stop further execution in this callback
      return;
  }
  if(!passwd) {
      response.status(400).json("enter password");
// stop further execution in this callback
      return;
  }

 /*for(i=0;i<users.length;i++){
    const val = users[i].user4.includes(user1+':'+ passwd);
    
   
  if(val){
      response.status(200).json("user authenticated");
      return;
  } else {
      response.status(400).json("user does not exist");
      return;
  }
} */
var val=users.includes(user1+':'+passwd)
if(val){
    response.status(200).json("user authenticated");
    return;
} else {
    response.status(400).json("user does not exist");
    return;
}
});
app.listen(4000);