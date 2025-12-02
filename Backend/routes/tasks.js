const express = require("express"); // getting express
const router = express.Router(); // getting router from express.Router()
const FetchUser = require("../middleware/FetchUser");
const Tasks = require("../models/TasksModel");
const { body, validationResult } = require("express-validator");

// ROUTE 1. to fetch all notes of logged user using "/tasky/tasks/fetchallnotes" using GET request and Login required

router.get("/fetchallproject", FetchUser, async (req, res) => {
    // const tasks = await Notes.find({ user : req.user.id });
    const tasks = await Tasks.find({ user: req.user.id });
    res.status(200).send({ tasks });
});

router.post("/addproject", FetchUser, [
    body("title").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
    body("status").isLength({ min: 1 }),
    body("priority").isLength({ min: 1 })
], async (req, res) => {
    const error = validationResult(req); // getting errors from validationResult
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    // returning status 400, with json message for errors received from errors array

    const { title, description, status, priority, duedate, enddate, users } = req.body;

    try {
        const task = new Tasks({ // creating a new note of a logged in user
            title, description, status, priority, duedate, enddate, users, user: req.user.id // here user is the id of logged in User, getting from FetchUser, which is the middleware function
        });

        const savedTask = await task.save();

        res.status(200).json({ savedTask });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

// ROUTE 3. to update a Task using "/tasky/tasks/updatetask" by PUT request and Login required

router.put("/updateproject/:id", FetchUser, [
    body("title").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
    body("status").isLength({ min: 1 }),
    body("priority").isLength({ min: 1 })
], async (req, res) => {
    const error = validationResult(req); // getting errors from validationResult
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
    // returning status 400, with json message for errors received from errors array

    const { title, description, status, priority, duedate, enddate, users } = req.body;

    console.log(title, description, status, priority, duedate, enddate, users);

    try {
        let newTask = {}; // creating a new task 

        if (title) { newTask.title = title } // checking whether the title exists
        if (description) { newTask.description = description } // checking whether the description exists
        if (status) { newTask.status = status } // checking whether the title exists
        if (priority) { newTask.priority = priority } // checking whether the description exists
        newTask.duedate = duedate;
        newTask.enddate = enddate;
        newTask.users = users;
        // if (assignedto) { newTask.assignedto = assignedto } // checking whether the description exists

        let taskToUpdate = await Tasks.findById(req.params.id); // fetching the tasks using id receiving from parameters
        if (!taskToUpdate) {
            res.status(401).json({ "message": "Task not found" });
        }

        if (taskToUpdate.user.toString() != req.user.id) { // checking whether the logged in user is updating its own notes or not
            res.status(401).json({ "message": "You are not allowed to make changes in this task" });
        }

        taskToUpdate = await Tasks.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });
        // finally updating the task 
        res.status(200).json({ "message": "Task updated successfully" });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

// ROUTE 4. to delete a Task using "/tasky/tasks/deletetask" by DELETE request and Login required

router.delete("/deleteproject/:id", FetchUser, async (req, res) => {
    try {
        let taskToUpdate = await Tasks.findById(req.params.id); // fetching the task using id receiving from parameters
        if (!taskToUpdate) {
            res.status(401).json({ "message": "Task not found" });
        }

        if (taskToUpdate.user.toString() != req.user.id) { // checking whether the logged in user is updating its own tasks or not
            res.status(401).json({ "message": "You are not allowed to make changes in this task" });
        }

        taskToUpdate = await Tasks.findByIdAndDelete(req.params.id);
        // finally deleting the task 

        res.status(200).json({ "message": "Task deleted successfully" });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

router.get('/totalprojects', async (req, res) => {
    try {
        const tasks = await Tasks.find();
        res.status(200).send(tasks.length);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // exporting the router variable to parent component