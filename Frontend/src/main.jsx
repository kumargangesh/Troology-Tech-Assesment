import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './Tasky/Routing.jsx'
import TaskState from './Tasky/Context/TaskState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskState>
      <Routing />
    </TaskState>
  </StrictMode>,
)
