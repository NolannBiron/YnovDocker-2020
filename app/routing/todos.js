// var todos = require('../controllers/todos');
// var tasks = require('../controllers/task');

// app.get('/todo', todos.index);
// app.post('/todo', todos.create);
// app.delete('/todo/:id', todos.delete);

// app.get('/todo/task', tasks.index);
// app.post('/todo/task', tasks.create);
// app.put('/todo', tasks.update)
// app.delete('/todo/:id', tasks.delete);



const router = require('express').Router();
const mongoose = require('mongoose');
 
const Todo = mongoose.model('Todo');
const Task = mongoose.model('Task')

router.param('todo', function (req, res, next, id) {
 
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.sendStatus(422);
    }
  
    Todo.findById(id)
        .populate('tasks')
        .then(function (todo) {
            if (!todo) { return res.sendStatus(404); }
  
            req.todo = todo;
  
            return next();
        });
 });

 router.get('/', (req, res) => {
 
    Todo.find()
        .populate('tasks')
        .then(logLib.logContent)
        .then((todos) => {
            return res.json({
                todos: todos.map((todo) => {
                    return todo.toDto();
                })
            });
        });
 });

 router.post('/', (req, res) => {
    if (!req.body.title) {
        res.status(422);
    }
  
    let todo = new Todo();
    todo.title = req.body.title;
  
    todo.save().then(() => {
        res.json(todo.toDto());
    })
  
 });
 
 router.delete('/:todo', (req, res) => {
 
    req.todo.remove().then(function () {
        return res.sendStatus(200);
    });
 });

module.exports = router;