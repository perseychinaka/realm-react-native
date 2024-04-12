// App.js
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import TaskService from './services/TaskService';
import  Realm from 'realm';
import {v4 as uuidv4} from 'uuid';
const App = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(TaskService.findAll());
  }, []);

  const addTask = () => {
    let _id = new Realm.BSON.ObjectId();
    let task = {name: taskName,_id, completed: false};
    TaskService.save(task);
    setTasks([...tasks, task]);
    setTaskName('');
  };

  const completeTask = (taskName) => {
    let task = tasks.find(t => t.name === taskName);
    task.completed = true;
    TaskService.update(task, () => setTasks([...tasks]));
  };

  return (
    <View>
      <TextInput value={taskName} onChangeText={setTaskName} />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <View>
            <Text onPress={() => completeTask(item.name)}>{item.name}</Text>
            <Text>{item.completed ? 'Completed' : 'Not Completed'}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;