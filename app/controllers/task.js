/**
 * Index Action
 * 
 * @param req
 * @param res
 */

const Task = mongoose.model('Task');
const Todo = mongoose.model('Todo');

exports.index = function (req, res) {
    var returnResponse = function (obj) {
        req.task = task;
        res.json(obj);
    };


    //FILTRAGE : select(-name) pour exclure select(name lastname) pour inclure 
    Task.findById(req.body.id).then(() => {
        req.task = task;
    }).execAsync()
    .then(returnResponse);

};

exports.create = function(req, res) {

    var options = {_id: req.body.id};

    Todo.findOneAsync(options).then(logLib.logContent).then((todo) => {

        let task = new Task();
        task.content = req.body.content;
        task.state = false;
        task.todo = todo;

        task.saveAsync().then(() => {
 
            todo.tasks.push(task);
  
            todo.save(() => {
                res.json(task.toDto());
            });
        });

    })
};

exports.update = function(req, res) {
    var returnResponse = function (obj) {
        res.json(obj);
    };

    var options = {_id: req.body.id};

    var returnUpdatedObject = function(){
        Task.findOneAsync(options)
        .then(() => {
            task.state = req.body.state;
 
            task.save().then(() => {
                res.json(task);
            })
        })
        .then(logLib.logContent)
        .then(returnResponse);
    }

    delete req.body['_id'];

    Task.findOneAndUpdate(options, req.body)
    .then(logLib.logContent)
    .then(returnUpdatedObject);
};

exports.delete = function(req, res) {
    var returnResponse = function () {
        res.json({message: 'All is fine'});
    };

    var returnError = function() {
        res.status(500).json({message: 'PROBLEM'})
    }

    var options = {_id: req.params.id};

    Task.findOneAndRemove(options)
    .catch(logLib.throwError)
    .done(returnResponse, returnError);

}
