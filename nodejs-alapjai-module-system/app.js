const utils = require('./utils')
const utils2 = require('./utils2')

//modulrendszer 1. feladat
console.log(utils.increaseAndFormatDate([new Date('2019-10-08T11:50:10'),new Date('2020-11-08T11:50:10'),new Date('2021-03-18T11:50:10')]))
//console.log(utils.increaseAndFormatDate([new Date('11/21/2020'),new Date('11/1/2020'),new Date('11/21/2019')]))

//modulrendszer 2. feladat
const user = [
    {
        firstName: 'Várdai',
        lastName: 'Enikő',
        age: 46
    },
    {
        firstName: 'Kiss',
        lastName: 'Péter',
        age: 25
    },
    {
        firstName: 'Papp',
        lastName: 'Józsf',
        age: 39
    }
]
console.log(utils2.generateUserList(user))
console.log(utils2.getUserNames(user)) 

