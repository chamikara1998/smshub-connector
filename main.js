const express = require('express')
var axios = require('axios');
const app = express()
let port = process.env.PORT || 3000

app.get('/', (req, res) => {
    if(req.query.Authorization !== undefined){
        sendMessage(req,res);

    }else{
        res.status(401).send("API Key Missing");
    }
})

function sendMessage(req,res){
    var data = JSON.stringify({
        "message": req.query.SmsMessage,
        "phoneNumber": req.query.PhoneNumber
    });

    var config = {
        method: 'post',
        url: 'https://api.smshub.lk/api/v1/send/single',
        headers: {
            'Authorization': req.query.Authorization,
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            res.send({status: "Sent Successfully",data: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})