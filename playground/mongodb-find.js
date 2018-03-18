// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Same as the code above [ES6 Object destructuring]

//var obj = new ObjectID();
//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');


    //db.collection('Todos').find({completed: false}).toArray().then((docs) => {

    // db.collection('Todos').find({
    //     _id: new ObjectID('5aae9a82811bafed6281626f')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, null, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });
    
    db.collection('Users').find({name: 'Sean'}).toArray().then((docs) => {
        console.log('Users:');
        console.log(JSON.stringify(docs,null, 2));
    }, (err) => {
        console.log('Unable to find docs', err);
    });

    //client.close();
});