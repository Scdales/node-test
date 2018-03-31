var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local objects
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123456
// :id created id variable and can be fetched with req.params.id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    //res.send(req.params);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
        console.log("Error");
        res.status(400).send();     
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

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