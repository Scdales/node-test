const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5aaeea8d336e0a2c2f918b51';

User.findById(id).then((user) => {
    if (!user) {
        console.log('User ID not found');
    }
    console.log('User by id', user);
}).catch((e) => console.log(e));

// var id = '5abfb11a512fa68828bc5af011';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Returns an array, populated or not
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// // Returns a single object
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//         console.log('Todo', todo);
// });

// Only searches IDs
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));