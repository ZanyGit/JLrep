// 97da6b8f1a84f5dcbac73f749e5cd7c3-us5   API KEY  97da6b8f1a84f5dcbac73f749e5cd7c3-us5

// cc177f6703 LIST ID cc177f6703

// https://us5.admin.mailchimp.com/lists/

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.post("/", function(req,res){
  var firstName = req.body.FNAME;
  var lastName = req.body.LNAME;
  var email = req.body.EMAIL;
  const data = {
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const datajson = JSON.stringify(data);

  const options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/cc177f6703",
    method: "POST",
    headers: {
      "Authorization":"Ludvig 97da6b8f1a84f5dcbac73f749e5cd7c3-us5"
    },
    body: datajson,
  };

  request(options, function(error, response, body){
    if(error){
      console.log(error);
    }else {
      console.log(response.statusCode)
    }
  });

  res.redirect("/")
});

app.get("/", (req,res)=> {

  res.sendFile(__dirname +"/base.html")
})

app.listen(3000,function(){
  console.log("server running on port 3000")
});
