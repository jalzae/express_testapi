const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
var axios = require('axios');
var request = require('request');
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


var corsOptions = {
    origin: "http://localhost:3000"
};
const apikey = 'b03bd4c7bed241461618c2302f1bfe7f';

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ 'message': 'hello' });
})

app.post('/cost', async (req, res) => {
    
    var options = {
        'method': 'POST',
        'url': 'https://api.rajaongkir.com/starter/cost',
        'headers': {
            'key': apikey,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: req.body
    };

    try {
        await request(options, function (error, response) {
            if (error) throw new Error(error);
            res.json(JSON.parse(response.body));
        });


    }
    catch (e) {
        res.json({ 'message': 'request is not correct' })
    }

});


app.get('/province/:id', async (req, res) => {
    let id = req.params.id;

    var options = {
        'method': 'GET',
        'url': 'https://api.rajaongkir.com/starter/province?id=' + id,
        'headers': {
            'key': apikey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    try {
        await request(options, function (error, response) {
            if (error) throw new Error(error);

            res.json(JSON.parse(response.body));
        });
    }
    catch (e) {
        res.json({ 'message': 'request is not correct' })
    }

});

app.get('/city/:id/:province', async (req, res) => {
    let id = req.params.id;
    let province = req.params.province;

    var options = {
        'method': 'GET',
        'url': 'https://api.rajaongkir.com/starter/province?id=' + id + '&?province=' + province,
        'headers': {
            'key': apikey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    };
    try {
        await request(options, function (error, response) {
            if (error) throw new Error(error);

            res.json(JSON.parse(response.body));
        });
    }
    catch (e) {
        res.json({ 'message': 'request is not correct' })
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});