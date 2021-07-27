const express = require('express');
const createError = require('http-errors');

const personService = require('./person.service');

// Create a new person.
exports.create = (req, res, next) => {
    const { lastName, firstName, vaccine } = req.body;
    if (!lastName || !firstName || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newPerson = {
        firstName: firstName,
        lastName: lastName,
        vaccine: vaccine
    };

    return personService.create(newPerson)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAllCount = (req, res, next) => {    
    return personService.findAll()
    .then( people => {
        res.json(people.length);
    });
};

exports.findAllVaccinated = async (req, res, next) => {
    const people = await personService.findAll();
    let result = people.filter(dat => dat.vaccine !== "");
    if (!result) {
        return next(new createError.NotFound("Vaccinated Person is not found"));
    }
    res.json(result);    
};

exports.findOne = async (req, res, next) => {
    const person = await personService.findOne(req.params.id);
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    }
    if (person.vaccine) {
        res.json(person.vaccine);
    } else {
        res.json(false);
    }
    
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    
    const person = await personService.findOne(id);
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
    return personService.update(id, update)
        .then(person => {
            res.json(person);
        })
        .catch( err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = async (req, res, next) => {
    const vaccina = req.params.vaccine;
    if (!vaccina) {
        return next(new createError.NotFound("Vaccine is not found"));
    }
    const people = await personService.findAll();
    let result = people.filter(p => p.vaccine === vaccina);
    let resultId = result.map(r => r.id);

    try {
        resultId.map(async (ri)=>{
            await personService.findByIdAndDelete(ri);
        })        
    } catch (err) {
        return next(new createError.NotFound("Vaccine is not found"));
    }

    res.json(result);
};