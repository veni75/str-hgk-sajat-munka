const express = require('express');
const data = require('./data');

const controller = express.Router();

controller.get('/count', (req, res) => {   
    let result = data.filter(dat=>dat.vaccine !== "");   
    res.json(result.length);
});

controller.get('/vaccinated', (req, res) => {
    let result = data.filter(dat=>dat.vaccine !== "");
    res.json(result);
});

module.exports = controller;