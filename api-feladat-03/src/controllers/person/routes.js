const express = require('express');
const data = require('./data');
const createError = require('http-errors');

const controller = express.Router();

controller.get('/count', (req, res, next) => {
    let result = data.filter(dat => dat.vaccine !== "");
    if (!result) {
        return next(new createError.NotFound("Vaccinated Person is not found"));
    }
    res.json(result.length);
});

controller.get('/vaccinated', (req, res, next) => {
    let result = data.filter(dat => dat.vaccine !== "");
    if (!result) {
        return next(new createError.NotFound("Vaccinated Person is not found"));
    }
    res.json(result);
});

//1.
controller.get('/:id/vaccinated', (req, res, next) => {
    const person = data.find(pers => pers.id === Number(req.params.id));
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    }
    if (person.vaccine) {
        res.json(person.vaccine);
    } else {
        res.json(false);
    }
});

// 2. Create a new person.
controller.post('/', (req, res, next) => {
    const { lastName, firstName, vaccine } = req.body;
    if (!lastName || !firstName || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);
    res.status(201);
    res.json(newPerson);
});

// 3. Update a person.
controller.put('/:id/:vaccine', (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    const index = data.findIndex(p => p.id === Number(id));
    const { firstName, lastName } = data[index];

    if (!lastName || !firstName || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    data[index] = {
        id,
        firstName,
        lastName,
        vaccine
    };

    res.json(data);
});

// 4. Delete
controller.delete('/:vaccine', (req, res, next) => {
    const vaccina = req.params.vaccine;
    if (!vaccina) {
        return next(new createError.NotFound("Vaccine is not found"));
    }
    let result = data.filter(p => p.vaccine !== vaccina);
    res.json(result);
});

module.exports = controller;