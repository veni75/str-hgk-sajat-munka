const express = require('express');

const createError = require('http-errors');
const Person = require('../../models/person.model');

const controller = express.Router();

controller.get('/count', async (req, res, next) => {
    const people = await Person.find();
    console.log(people);
    let result = people.filter(pe => pe.vaccine !== "");
    if (!result) {
        return next(new createError.NotFound("Vaccinated Person is not found"));
    }
    res.json(result.length);
});

controller.get('/vaccinated', async (req, res, next) => {
    const people = await Person.find();
    let result = people.filter(dat => dat.vaccine !== "");
    if (!result) {
        return next(new createError.NotFound("Vaccinated Person is not found"));
    }
    res.json(result);
});

//1.
controller.get('/:id/vaccinated', async (req, res, next) => {
    const person = await Person.findById(req.params.id);
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

    const newPerson = new Person({
        firstName: firstName,
        lastName: lastName,
        vaccine: vaccine
    });
    newPerson.save()
        .then(data => {
            res.status(201);
            res.json(data);
        });
});

// 3. Update a person.
controller.put('/:id/:vaccine', async (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;

    const person = await Person.findById(req.params.id);
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    }

    if (!person.lastName || !person.firstName || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        firstName: person.firstName,
        lastName: person.lastName,
        vaccine: vaccine
    };

    let personVaccine = {};
    try {
        personVaccine = await Person.findByIdAndUpdate(id, update, {
            new: true,
            useFindAndModify: false
        });
    } catch (err) {
        return next(new createError.BadRequest(err));
    }

    return res.json(personVaccine);
});

// 4. Delete
controller.delete('/:vaccine', async (req, res, next) => {
    const vaccina = req.params.vaccine;
    if (!vaccina) {
        return next(new createError.NotFound("Vaccine is not found"));
    }
    const people = await Person.find();
    let result = people.filter(p => p.vaccine === vaccina);
    let resultId = result.map(r => r.id);

    try {
        const person = await Person.findByIdAndDelete(resultId);
    } catch (err) {
        return next(new createError.NotFound("Vaccine is not found"));
    }

    res.json(result);
});

module.exports = controller;