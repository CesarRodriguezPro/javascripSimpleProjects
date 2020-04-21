const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(process.env.PORT || 3000, function () {
    console.log('Server Running in Port 3000');
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});


app.post('/', function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members:[ {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = 'https://us4.api.mailchimp.com/3.0/lists/380f54127e';
    const options = {
        method: "POST",
        auth: "anyword:22f2b6512fd5d2a0ae76bad7e5452191-us4"
    }

    const requests = https.request(url, options, function (response) {
        response.on("data", function (data) {
 

            if(JSON.parse(data).total_created == 1){
                res.sendFile(__dirname+"/sucess.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }

        });

    });
    requests.write(jsonData);
    requests.end();
});


app.post('/failure', function(req,res){
    res.redirect('/')
});