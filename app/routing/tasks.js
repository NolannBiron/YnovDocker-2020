const router = require('express').Router();
const mongoose = require('mongoose');
 
const Todo = mongoose.model('Todo');
const Task = mongoose.model('Task');


router.param('task', function (req, res, next, id) {

    Task.findById(id).then((task) => {
  
        req.task = task;
  
        return next();
    })
 });


 router.post('/', (req, res) => {
  
    Todo.findById(req.body.todoId).then((todo) => {
  
        let task = new Task();
        task.content = req.body.content;
        task.state = false;
        task.todo = todo;
  
        task.save().then(() => {
  
            todo.tasks.push(task);
  
            todo.save().then(() => {
                res.json(task.toDto());
            });
        });
    });
 });

 router.put('/', (req, res) => {
 
    if (req.body.state == undefined || !req.body.id) {
        res.sendStatus(422);
    }
  
    if (!req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.sendStatus(422);
    }
  
  
    Task.findById(req.body.id).then((task) => {
        task.state = req.body.state;
  
        task.save().then(() => {
            res.json(task.toDto());
        })
    })
 });


 router.delete('/:task', (req, res) => {
    
    let task = req.task;

    var returnResponse = function () {
        res.json({message: 'All is fine'});
    };

    var returnError = function() {
        res.status(500).json({message: 'PROBLEM'})
    }

    task.remove()
    .catch(logLib.throwError)
    .done(returnResponse, returnError);

});

 module.exports = router;