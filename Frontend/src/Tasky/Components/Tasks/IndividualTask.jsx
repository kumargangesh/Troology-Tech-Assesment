import React, { useContext, useEffect, useState } from 'react'
import taskContext from '../../Context/TaskContext';
import "./Style.css";
import { format } from "date-fns";

export default function NoteItem(props) {

    const { task, updateNote } = props;
    const context = useContext(taskContext);
    const { deleteTask, setAlertMessage, toggleToShow } = context;

    const finalDeleteTask = () => {
        if (window.confirm("Sure to delete")) {
            deleteTask(task._id)
            toggleToShow(true)
            setAlertMessage("Note titles " + task.title + " deleted successfully");
            setTimeout(() => {
                toggleToShow(false);
                setAlertMessage("");
            }, 1500);
        }
    }

    return (
        <div className="card my-3">
            <div className="card-body inditask">

                <button className="card-title btn btn-outline-info" style={{
                    width: "80%",
                    height: "auto",
                    margin: "3% auto",
                    fontWeight: "bold",
                    padding: "5% 2%",
                    marginLeft: "10%"
                }}>{task.title}</button>

                <center><p className="card-text" style={{
                    margin: "2%"
                }}>{task.description}</p></center>

                <div className="stapri d-flex justify-content-between">

                    <button className={
                        task.status === "completed" ?
                            "btn btn-warning"
                            :
                            "btn btn-danger"
                    }>{task.status}</button>

                    <button className={
                        task.priority === "COMMON" ?
                            "btn btn-warning"
                            :
                            "btn btn-danger"
                    }>{(task.priority).toLowerCase()}</button>
                </div>

                <div className="dateassign d-flex justify-content-between">
                    <div className="duedate">
                        <label htmlFor="">Due Date: </label>

                        <h6 style={{ marginTop: "2%" }}>
                            {
                                task.duedate
                            }
                        </h6>

                        <label htmlFor="">End Date: </label>

                        <h6 style={{ marginTop: "2%" }}>
                            {
                                task.enddate
                            }
                        </h6>
                    </div>

                    <div className="assign">
                        <label htmlFor="">Assign To: </label>

                        <p>{task.users}</p>
                    </div>
                </div>

                <div style={{
                    // border: "1px solid black",
                    width: "70%",
                    marginTop: "2%",
                    // padding: "5%",
                    margin: "2% auto"
                }} className="d-flex justify-content-between icons">
                    <i class="fa-solid fa-pen" onClick={() => {
                        updateNote(task)
                    }} />
                    <i class="fa-solid fa-trash" onClick={finalDeleteTask} />
                </div>
            </div>
        </div>

    )
}

