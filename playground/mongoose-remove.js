const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
// Todo.findOneAndRemove({_id: '5abfc6a65c3a85f56afb9ee5'}).then((todo) => {

// });
Todo.findByIdAndRemove('5abfc6a65c3a85f56afb9ee5').then((todo) => {
    console.log(todo);
});