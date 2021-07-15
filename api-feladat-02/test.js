fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstName: 'Jeno', lastName: 'Árpi', vaccine: 'Moderna'})
}).then(r => r.json())
    .then(d => console.log(d));


    fetch('http://localhost:3000/person/Jensen', {
        method: 'DELETE',
    }).then(r => r.json())
        .then(d => console.log(d));

       
    fetch('http://localhost:3000/person/1/Sinofarm', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    
}).then(r => r.json())
    .then(d => console.log(d));