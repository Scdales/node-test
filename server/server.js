require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local objects
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => 
        res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // This creates a subset of the passed object, preventing users from updating anything
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); // Number of milliseconds after midnight Jan1 1970
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

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