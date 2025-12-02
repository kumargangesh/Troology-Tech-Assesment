import React, { useContext } from 'react'
import taskContext from '../Context/TaskContext';

export default function NormalUser() {

    const context = useContext(taskContext);

    const {userEmail} = context;

  return (
    <div>
      <center>
        <h1>hello {userEmail}</h1>
      </center>
    </div>
  )
}
