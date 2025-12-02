import { useState } from 'react';
import TaskContext from './TaskContext';

const TaskState = (props) => {

  const host = "http://localhost:5000";

  const tempTasks = [];
  const tempUsers = [];
  const tempImpTasks = [];

  const [tasks, setTasks] = useState(tempTasks);
  const [alertMessage, setAlertMessage] = useState("");
  const [toShow, toggleToShow] = useState(false);
  const [userAuth, setUserAuth] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");

  const [allUsers, setAllUsers] = useState(tempUsers);

  const [impTasks, setImpTasks] = useState(tempImpTasks);

  // fetching all the tasks

  const fetchAllTasks = async () => {
    const response = await (fetch(`${host}/tasky/project/fetchallproject`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth
      }
    }));

    const json = await response.json();
    const allTasks = json.tasks;
    setTasks(allTasks);

    let importantTasks = [];
    let normalTasks = [];

    for (let g = 0; g < allTasks.length; g++) {
      if (allTasks[g].priority === "IMPORTANT")
        importantTasks.push(allTasks[g]);
      else
        normalTasks.push(allTasks[g]);
    }

    setTasks(normalTasks);

    setImpTasks(importantTasks);

  }

  const fetchAllUsers = async () => {
    const response = await (fetch(`${host}/tasky/auth/getallusers`, {
      method: "POST"
    }));
    const json = await response.json();
    console.log(json);
    let allUsers = json.users;
    console.log('email: ');
    let newUsers = [];

    allUsers.map((user) => {
      if (String(user.email) !== String(userEmail)) {
        newUsers.push(user);
      }
    });

    setAllUsers(newUsers);
  }

  // adding a new task

  const addTask = async (title, description, status, priority, duedate, enddate, users) => {

    // alert();
    console.log(title, description, status, priority, duedate, enddate, users);
    console.log(typeof(enddate));

    // Now we are going to make API calls 

    const response = await (fetch(`${host}/tasky/project/addproject`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth
      },
      body: JSON.stringify({ title, description, status, priority, duedate, enddate, users })
    }));

  }

  // updating a task

  const updateTask = async (id, title, description, status, priority, duedate, enddate, users) => {

    // Now we are going to make API calls 

    const response = await (fetch(`${host}/tasky/project/updateproject/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth
      },
      body: JSON.stringify({ title, description, status, priority, duedate, enddate, users })
    }));

  }

  // delete a task

  const deleteTask = async (id) => {

    const response = await (fetch(`${host}/tasky/project/deleteproject/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': userAuth
      }
    }));

    const json = response.json();
    const newTasks = tasks.filter((task) => { return task._id !== id })
    setNotes(newTasks)
  }

  const deleteUser = async (id) => {
    const response = await (fetch(`${host}/tasky/auth/deleteuser/${id}`, {
      method: "DELETE"
    }));
    const json = await response.json();
    console.log(json.message);
  }

  const updateUser = async (id, role) => {

    // Now we are going to make API calls 
    // alert("id to updtae: "+id);

    const response = await (fetch(`${host}/tasky/project/updatetask/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role })
    }));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, fetchAllTasks, alertMessage, setAlertMessage, toShow, toggleToShow, userAuth, setUserAuth, userEmail, setUserEmail, userType, setUserType, allUsers, setAllUsers, fetchAllUsers, deleteUser, updateUser, impTasks, setImpTasks }}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState;

