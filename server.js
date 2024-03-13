require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const axios = require('axios');

const apiKey = process.env.apiKey;
const appId = process.env.appId;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/getNFTUri', async (req, res) => {
    const { contractAddress, id } = req.body;
    try {
        const response = await axios.post('https://api.vottun.tech/erc/v1/erc1155/tokenUri', {
            contractAddress,
            network: 97,
            id
        }, {
            headers: { 
                'Content-Type': 'application/json',               
                'Authorization': `Bearer ${process.env.apiKey}`, // Utilizar la clave API desde las variables de entorno
                'x-application-vkn': process.env.appId // Utilizar el App ID desde las variables de entorno
            }
        });
        res.status(200).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
