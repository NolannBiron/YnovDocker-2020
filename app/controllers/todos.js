/**
 * Index Action
 * 
 * @param req
 * @param res
 */

const Todo = mongoose.model('Todo');

exports.index = function (req, res) {
    var returnResponse = function (obj) {
        res.json(obj);
    };

    //FILTRAGE : select(-name) pour exclure select(name lastname) pour inclure 
    Todo.find().execAsync()
    .then(logLib.logContent)
    .then(returnResponse);

};


exports.create = function(req, res) {

    var returnResponse = function (obj) {     
        res.json(obj);
    };

    Todo(req.body).saveAsync()
    .then(logLib.logContent)
    .then(returnResponse);
};


exports.delete = function(req, res) {
    var returnResponse = function () {
        res.json({message: 'All is fine'});
    };

    var returnError = function() {
        res.status(500).json({message: 'PROBLEM'})
    }

    Todo.findOneAndRemove(options)
    .catch(logLib.throwError)
    .done(returnResponse, returnError);

}
