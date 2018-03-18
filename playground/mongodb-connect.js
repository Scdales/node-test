// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Same as the code above [ES6 Object destructuring]

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, null, 2));
    // });

// Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Sean',
    //     age: '29',
    //     location: 'London'
    // }, (err,result) => {
    //     if (err) {
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});