import Realm from 'realm';
import Task from '../models/Task';

let repository = new Realm({schema: [Task]});
let TaskService = {
    save: function(task) {
    //   if (repository.objects('Task').filtered(`name = "${task.name}"`).length) return;
      repository.write(() => {
        repository.create('Task', task);
      });
    },
  
  delete: function(task) {
    repository.write(() => {
      let deletingTask = repository.objects('Task').filtered(`name = "${task.name}"`)[0];
      repository.delete(deletingTask);
    });
  },
  update: function(task, callback) {
    if (!callback) return;
    repository.write(() => {
    //   let updatingTask = repository.objects('Task').filtered(`_id = "${task._id}"`)[0];
    //   updatingTask.completed = !task.completed;
    repository.write(() => {
        task.completed = true;
      });
        callback();
    });
  },
  findAll: function() {
    return repository.objects('Task');
  },
};

export default TaskService;