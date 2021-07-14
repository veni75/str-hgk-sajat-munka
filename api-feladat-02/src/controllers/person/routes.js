const express = require('express');
const data = require('./data');

const controller = express.Router();

controller.get('/count', (req, res) => {
    res.json(data.length);
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
controller.put('/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(p => p.id === Number(id));
    const { firstName, lastName, vaccine } = req.body;

    data[index] = {
        id,
        firstName,
        lastName,
        vaccine
    };

    res.json(data[index]);
});

// 4. Delete
controller.delete('/:vaccine', (req, res) => {
    data = data.filter(p => p.vaccine !== vaccine);
    res.json({});
});

module.exports = controller;