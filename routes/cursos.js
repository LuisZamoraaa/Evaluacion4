const express = require('express');
const router = express.Router();
const axios = require('axios');

// URL del servidor web externo
const externalUrl = 'http://172.20.10.6/xd/datos.json';

router.get('/import', async (req, res) => {
    try {
        const response = await axios.get(externalUrl);
        const data = response.data;
        res.status(200).json(data.cursos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from external server' });
    }
});

module.exports = router;
