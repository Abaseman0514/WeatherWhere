const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;
const qs = require('querystring');

app.use(express.json());
app.use('/', express.static('public'));

app.use('/proxy', (req, res) => {
    let url = req.path.substring(1);
    const params = req.query;
    const method = req.method.toLowerCase();
    url = params ? `${url}?${qs.unescape(qs.stringify(params))}` : url;
    axios[method](url, {
        params
    }).then(result => {
        res.status(result.status).json(result.data);
    });

})

app.listen(port, () => console.log(`Your app is running on localhost:${port}`));