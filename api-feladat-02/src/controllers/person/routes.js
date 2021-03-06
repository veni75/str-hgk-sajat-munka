const express = require('express');
const data = require('./data');

const controller = express.Router();

controller.get('/count', (req, res) => {
    let result = data.filter(dat=>dat.vaccine !== "");   
    res.json(result.length);
});

controller.get('/vaccinated', (req, res) => {
    let result = data.filter(dat => dat.vaccine !== "");
    res.json(result);
});

//1.
controller.get('/:id/vaccinated', (req, res) => {
    const person = data.find(pers => pers.id === Number(req.params.id));
    res.json(person.vaccine);
});

// 2. Create a new person.
controller.post('/', (req, res) => {
    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);
    res.status(201);
    res.json(newPerson);
});

// 3. Update a person.
controller.put('/:id/:vaccine', (req, res) => {
    const id = req.params.id;    
    const vaccine = req.params.vaccine;
    const index = data.findIndex(p => p.id === Number(id));
    const { firstName, lastName } = data[index];

    data[index] = {
        id,
        firstName,
        lastName,
        vaccine
    };

    res.json(data); 
});

// 4. Delete
controller.delete('/:vaccine', (req, res) => {  
    const vaccina = req.params.vaccine;    
    let result = data.filter(p => p.vaccine !== vaccina);
    res.json(result); 
});

module.exports = controller;