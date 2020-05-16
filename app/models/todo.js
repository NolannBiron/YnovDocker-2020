const Task = mongoose.model('Task');

 let TodoSchema = new mongoose.Schema({
   title: { type: String, index: true },
   tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

TodoSchema.pre('remove', (next) => {
  Task.remove({ todoId: this._id }).exec();
  next();
})

TodoSchema.methods.toDto = function () {

  return {
      id: this._id,
      title: this.title,
      tasks: this.tasks.map((task) => {
          return task.toDto();
      })
  }

}
 
 
mongoose.model('Todo', TodoSchema);