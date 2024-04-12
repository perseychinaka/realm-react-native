import Realm, {ObjectId} from 'realm';

class Task extends Realm.Object {
  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
      completed: 'bool',
    },
  };
}

export default Task;