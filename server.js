const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.json());
app.use('/', express.static('public'));

app.use('/proxy', (req, res) => {
    const url = req.path.substring(1);
    const method = req.method.toLowerCase();

    axios[method](url).then(result => {
        res.status(result.status).json(result.data);
    });

})

app.listen(port, () => console.log(`Your app is running on localhost:${port}`));