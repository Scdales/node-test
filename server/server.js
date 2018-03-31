var express = require('express');
var bodyParser = require('body-parser');

//Local objects
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});


//EXAMPLES//

// var otherTodo = new Todo({
//     text: 'Make some food or something'
// });

// otherTodo.save().then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log('Unable to save', e);
// });

// var newUser = new User({
//     email: '  galiphrey@booya.com  '
// });

// newUser.save().then((usr) => {
//     console.log(usr);
// }, (e) => {
//     console.log('Unable to save user', e)
// });