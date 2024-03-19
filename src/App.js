import React, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';
import FullName from './components/FullName.jsx';
import TaskFilter from './components/TaskFilter.jsx';

import './App.css'; 

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [fullName, setFullName] = useState('Adyatama Mahabarata');
  const [number, setNumber] = useState('2602158626');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const cancelUpdate = () => {
    setUpdateData('');
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List</h2>
      <br />
      <br />

      {/* Display Full Name with Number */}
      <FullName fullName={fullName} number={number} />

      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Filter Buttons */}
      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* Display ToDos */}
      {toDo && toDo.length ? (
        <ToDo tasks={toDo} filter={filter} markDone={markDone} setUpdateData={setUpdateData} deleteTask={deleteTask} />
      ) : (
        'No Tasks...'
      )}
    </div>
  );
}

export default App;
