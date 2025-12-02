import React, { useContext, useState, useEffect, useRef } from 'react'
import taskContext from '../Context/TaskContext';
import IndividualTask from './Tasks/IndividualTask';
import { Link } from 'react-router-dom';
import "./Style.css";
import axios from 'axios';

export default function Home() {

  const context = useContext(taskContext);
  const { tasks, fetchAllTasks, addTask, updateTask, setAlertMessage, toggleToShow, userAuth, impTasks, allUsers, fetchAllUsers, getAllUsers, getAllProjects, totalUser, totalProjects } = context;

  const [title, setTitle] = useState("dhfdhj");
  const [desc, setDesc] = useState("fgjfdgjkdfjgkf");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("COMMON");
  const [duedate, setDueDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assign, setAssign] = useState("");
  const [errorMessage, changeErrorMessage] = useState("");

  const [etitle, esetTitle] = useState("");
  const [edesc, esetDesc] = useState("");
  const [estatus, esetStatus] = useState("");
  const [epriority, esetPriority] = useState("COMMON");
  const [eduedate, esetDueDate] = useState("");
  const [eendDate, esetEndDate] = useState("");
  const [eassign, esetAssign] = useState("");
  const [eerrorMessage, changeeErrorMessage] = useState("");

  const [noteToUpdate, changeNoteToUpdate] = useState("");

  const [previousCommon, setPreviousCommon] = useState(0);
  const [nextCommon, setNextCommon] = useState(6);

  const [previousImp, setPreviousImp] = useState(0);
  const [nextImp, setNextImp] = useState(6);

  const [pendingSClass, togglependingSClass] = useState("btn btn-outline-warning");
  const [completedSClass, togglecompletedSClass] = useState("btn btn-outline-danger");
  const [prioritySClass, toggleprioritySClass] = useState("btn btn-warning");

  const [ependingSClass, etogglependingSClass] = useState("btn btn-outline-warning");
  const [ecompletedSClass, etogglecompletedSClass] = useState("btn btn-outline-danger");
  const [eprioritySClass, etoggleprioritySClass] = useState("btn btn-warning");

  const [users, setUsers] = useState('USER1');
  const [eusers, esetUsers] = useState('user1');

  const handleUser = (e) => {
    setUsers(e.target.value);
  }

  const ehanldeUser = (e) => {
    esetUsers(e.target.value);
  }

  const handlePreviousCommon = () => {
    if (previousCommon >= 0) {
      setPreviousCommon(previousCommon, - 6);
      setNextCommon(nextCommon, - 6);
      // alert(previous);
    }
  }

  const handleNextCommon = () => {
    if (nextCommon >= 6 && nextCommon < notes.length) {
      setPreviousCommon(previousCommon + 6);
      setNextCommon(nextCommon + 6);
      // alert(next);
    }
  }

  const handlePreviousImp = () => {
    if (previousImp >= 0) {
      setPreviousImp(previousImp, - 6);
      setNextImp(nextImp, - 6);
      // alert(previous);
    }
  }

  const handleNextImp = () => {
    if (nextImp >= 6 && nextImp < impTasks.length) {
      setPreviousImp(previousImp + 6);
      setNextImp(nextImp + 6);
      // alert(next);
    }
  }

  const handleStatus = (event) => {
    let gettingStatus = event.target.textContent;
    gettingStatus = gettingStatus.toLowerCase();
    setStatus(gettingStatus);

    if (gettingStatus === "pending") {
      togglecompletedSClass("btn btn-outline-danger");
      if (pendingSClass === "btn btn-outline-warning") {
        togglependingSClass("btn btn-warning");
      } else {
        togglependingSClass("btn btn-outline-warning");
      }
    } else {
      togglependingSClass("btn btn-outline-warning");
      if (completedSClass === "btn btn-outline-danger") {
        togglecompletedSClass("btn btn-danger");
      } else {
        togglecompletedSClass("btn btn-outline-danger");
      }
    }
  }

  const ehandleStatus = (event) => {
    let gettingStatus = event.target.textContent;
    gettingStatus = gettingStatus.toLowerCase();
    esetStatus(gettingStatus);

    if (gettingStatus === "pending") {
      etogglecompletedSClass("btn btn-outline-danger");
      if (ependingSClass === "btn btn-outline-warning") {
        etogglependingSClass("btn btn-warning");
      } else {
        etogglependingSClass("btn btn-outline-warning");
      }
    } else {
      etogglependingSClass("btn btn-outline-warning");
      if (ecompletedSClass === "btn btn-outline-danger") {
        etogglecompletedSClass("btn btn-danger");
      } else {
        etogglecompletedSClass("btn btn-outline-danger");
      }
    }
  }

  useEffect(() => {
    fetchAllTasks();
    // fetchAllUsers();
    getAllUsers();
    getAllProjects();
    // loadChangedPages();
    // if (userAuth === "")
    //   toggleIsUser(false);
    // else
    //   toggleIsUser(true);
  });

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDesc = (e) => {
    setDesc(e.target.value)
  }

  const handlePriority = () => {
    if (priority === "COMMON") {
      setPriority('IMPORTANT');
      toggleprioritySClass("btn btn-danger");
    }
    else {
      setPriority("COMMON");
      toggleprioritySClass("btn btn-warning");
    }
  }

  const handleDueDate = (e) => {
    setDueDate(e.target.value)
  }

  const handleAssign = (e) => {
    setAssign(e.target.value)
  }

  const ehandleTitle = (e) => {
    esetTitle(e.target.value)
  }

  const ehandleDesc = (e) => {
    esetDesc(e.target.value)
  }

  const ehandlePriority = (e) => {
    if (epriority === "COMMON") {
      etoggleprioritySClass("btn btn-danger");
      esetPriority('IMPORTANT');
    }
    else {
      etoggleprioritySClass("btn btn-warning");
      esetPriority("COMMON");
    }
  }

  const ehandleDueDate = (e) => {
    esetDueDate(e.target.value)
  }

  const ehandleAssign = (e) => {
    esetAssign(e.target.value)
  }

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }

  const ehandleEndDate = (e) => {
    esetEndDate(e.target.value);
  }

  const validateTask = () => {
    if (title === "" && desc === "" && status === "" && priority === "" && duedate === "" && assign === "" && endDate === "" && users === "") {
      changeErrorMessage("enter all values");
      return false;
    }
    else if (title === "") {
      changeErrorMessage("enter title");
      return false;
    }
    else if (desc === "") {
      changeErrorMessage("enter description");
      return false;
    }
    else if (status === "") {
      changeErrorMessage("enter status");
      return false;
    }
    else if (priority === "") {
      changeErrorMessage("enter priority");
      return false;
    }
    else if (duedate === "") {
      changeErrorMessage("enter duedate");
      return false;
    }
    else if (endDate === "") {
      changeErrorMessage('enter end date');
      return false;
    } else if (users === "") {
      changeErrorMessage('enter assigned user');
      return false;
    }
    else {
      changeErrorMessage("");
      return true;
    }
  }

  const clearAll = () => {
    setTitle("");
    setDesc("");
    setStatus("");
    setPriority("COMMON");
    setAssign("");
    setDueDate("");
  }

  const clearEAll = () => {
    esetTitle("");
    esetDesc("");
    esetStatus("");
    esetAssign("");
    esetDueDate("");
    esetPriority("COMMON");
    togglecompletedSClass("btn btn-outline-danger");
    togglependingSClass("btn btn-outline-warning");
    toggleprioritySClass("btn btn-warning");
  }

  const addNewTask = () => {
    // console.log(title, desc, status, priority, duedate, assign, endDate, users);
    if (validateTask()) {
      addTask(title, desc, status, priority, duedate, endDate, users);
      toggleToShow(true);
      setAlertMessage("New Task added successfully");
      setTimeout(() => {
        toggleToShow(false);
        setAlertMessage("");
        clearAll();
      }, 1500);
    }
  }

  const updateNNote = (note) => {
    ref.current.click();
    esetTitle(note.title);
    esetDesc(note.description);
    esetStatus(note.status);
    esetPriority(note.priority);
    esetDueDate(note.duedate);
    esetEndDate(note.endDate);
    esetUsers(note.users);
    // esetAssign(note.assignedto);
    changeNoteToUpdate(note);

    if (note.status === "pending") {
      etogglecompletedSClass("btn btn-outline-danger");
      etogglependingSClass("btn btn-warning");
    } else {
      etogglependingSClass("btn btn-outline-warning");
      etogglecompletedSClass("btn btn-danger");
    }

    if (note.priority === "IMPORTANT") {
      etoggleprioritySClass("btn btn-danger");
    } else {
      etoggleprioritySClass("btn btn-warning");
    }

  }

  const confirmUpdate = () => {

    changeeErrorMessage("");
    updateTask(noteToUpdate._id, etitle, edesc, estatus, epriority, eduedate, eendDate, eusers);
    toggleToShow(true);
    setAlertMessage("Note updated successfully");

    setTimeout(() => {
      toggleToShow(false);
      setAlertMessage("");
      clearEAll();
    }, 1500);
    refClose.current.click();
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  return (

    <div>
      {
        userAuth === "" ?
          <div>
            <center><h1 style={{
              marginTop: "5%"
            }}>No user logged in, please either login in sign up</h1></center>
            <Link to="/"><button className="btn btn-secondary" style={{
              width: "15%",
              height: "60px",
              marginLeft: "40%",
              marginTop: "5%"
            }}>LOGIN / SIGNUP</button></Link>
          </div>
          :
          <>
            <div>
              <div className="newtaskform">

                <h3>Add new Project</h3>

                <div className="addnewtask">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={handleTitle} placeholder='title' />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Description</label>
                    <textarea type="text" class="form-control" id="exampleInputPassword1" value={desc} onChange={handleDesc} placeholder='description' />
                  </div>

                  <div className="stapri d-flex justify-content-between">
                    <div className="mb-3 statusandpri">
                      <label for="exampleInputPassword1" class="form-label">Status</label>
                      <div className="buttons d-flex justify-content-between">
                        <button className={pendingSClass} style={{
                          width: "40%",
                          height: "50px"
                        }} onClick={handleStatus}>PENDING</button>
                        <button className={completedSClass} style={{
                          width: "40%",
                          height: "50px"
                        }} onClick={handleStatus}>COMPLETED</button>
                      </div>
                    </div>

                    <div className="mb-3 priority">
                      <label for="exampleInputPassword1" class="form-label">Priority</label>
                      <br />
                      <button className={prioritySClass} style={{
                        width: "30%",
                        height: "50px"
                      }} onClick={handlePriority}>{priority}</button>
                    </div>
                  </div>

                  <div className="ddassi d-flex justify-content-between">
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Start Date</label>
                      <input type="date" className="form-control date" id="exampleInputPassword1" value={duedate} onChange={handleDueDate} />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">End Date</label>
                      <input type="date" className="form-control date" id="exampleInputPassword1" value={endDate} onChange={handleEndDate} />
                    </div>

                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Assigned To</label>
                    <select name="" id="">{
                      allUsers.map((singleUser) => {
                        {
                          singleUser.role === "normal" ?
                            <option value={singleUser.email}>{singleUser.email}</option>
                            :
                            <option value=""></option>
                        }
                      })
                    }</select>

                  </div>

                  <p style={{
                    color: 'red',
                    fontWeight: "bolder"
                  }}>{errorMessage}</p >

                  <button type="submit" class="btn btn-warning addtaskbutton" onClick={addNewTask}>Add Project</button>
                </div>


                <button style={{
                  display: "none"
                }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Updating a Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <div className="modal-body">
                        <div className="newNoteForm">
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              value={etitle}
                              onChange={ehandleTitle}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <textarea
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              value={edesc}
                              onChange={ehandleDesc}
                              style={{
                                height: "150px"
                              }}
                            />
                          </div>

                          <div className="mb-3">
                            <div class="mb-3" style={{
                              width: "70%"
                            }} >
                              <label for="exampleInputPassword1" class="form-label">Status</label>
                              <div className="buttons d-flex justify-content-between" style={{
                                width: "90%",
                                padding: ".5%"
                              }}>
                                <button className={ependingSClass} style={{
                                  width: "40%",
                                  height: "50px"
                                }} onClick={ehandleStatus}>PENDING</button>
                                <button className={ecompletedSClass} style={{
                                  width: "40%",
                                  height: "50px"
                                }} onClick={ehandleStatus}>COMPLETED</button>
                              </div>
                            </div>

                          </div>

                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Priority</label>
                            <br />
                            <button className={eprioritySClass} style={{
                              width: "30%",
                              height: "50px"
                            }} onClick={ehandlePriority}>{epriority}</button>

                          </div>

                          <div className="ddassi d-flex justify-content-between">
                            <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">Start Date</label>
                              <input type="date" className="form-control date" id="exampleInputPassword1" value={eduedate} onChange={ehandleDueDate} />
                            </div>

                            <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">End Date</label>
                              <input type="date" className="form-control date" id="exampleInputPassword1" value={eendDate} onChange={ehandleEndDate} />
                            </div>

                          </div>

                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Assigned To</label>

                            <select name="" id="" value={eusers} onChange={ehanldeUser}>
                              <option value="USER1">USER1</option>
                              <option value="USER2">USER2</option>
                            </select>

                          </div>

                        </div>
                      </div>

                      <p style={{
                        color: 'red',
                        fontWeight: "bolder",
                        marginLeft: "5%",
                        marginTop: "-3%"
                      }}>{eerrorMessage}</p>

                      <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary loginButton" data-bs-dismiss="modal" >Close</button>
                        <button type="button" className="btn btn-warning loginButton" onClick={confirmUpdate} >Update Project</button>
                      </div>
                    </div>
                  </div>
                </div>

                <h1>Dashboard:</h1>

                <div className="userandprojects d-flex justify-content-between">
                  <div>
                    <center><h3>Total Users : </h3></center>
                    <h4>{totalUser}</h4>
                  </div>

                  <div>
                    <center><h3>Total Projects : </h3></center>
                    <h4>{totalProjects}</h4>
                  </div>
                </div>

                {
                  impTasks.length > 0 ?
                    <div className="prtask">
                      <div className="container">
                        <u><h2>Priority Projects: </h2></u>
                        <div className="row">
                          {
                            impTasks.slice(previousImp, nextImp).map((task) => {
                              return (
                                <div className="col-md-4">
                                  <IndividualTask task={task} updateNote={updateNNote} />
                                </div>
                              )
                            })
                          }
                        </div>

                        <div>
                          {

                            impTasks.length > 3 ?
                              <div className='d-flex justify-content-between imptaskbuttons'>
                                <button className="btn btn-success" onClick={handlePreviousImp}>PREVIOUS</button>
                                <button className="btn btn-success" onClick={handleNextImp}>NEXT</button>
                              </div>
                              :
                              <></>
                          }
                        </div>

                      </div>
                    </div>
                    :
                    <></>
                }

                {
                  tasks.length > 0 ?
                    <div className="container prtask">
                      <u><h2 style={{
                        marginTop: "3%",
                        marginBottom: "3%"
                      }}>Normal Projects: </h2></u>
                      <div className="row">
                        {
                          tasks.slice(previousCommon, nextCommon).map((task) => {
                            return (
                              <div className="col-md-4">
                                <IndividualTask task={task} updateNote={updateNNote} />
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    :
                    <></>
                }

                <div>
                  {

                    tasks.length > 3 ?
                      <div className='d-flex justify-content-between imptaskbuttons' style={{
                        // border : "1px solid black",
                        padding: "1%",
                        width: "60%",
                        margin: "1% auto"
                      }}>
                        <button className="btn btn-success" onClick={handlePreviousCommon}>PREVIOUS</button>
                        <button className="btn btn-success" onClick={handleNextCommon}>NEXT</button>
                      </div>
                      :
                      <></>
                  }
                </div>


              </div>
            </div>
          </>
      }
    </div >

  )
}
