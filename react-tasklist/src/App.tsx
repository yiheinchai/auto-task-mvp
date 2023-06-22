import { useState } from 'react'
import './App.css'
import Task from './components/task'

function App() {

  return (
    <>
      <h1>AutoTasks</h1>
      <div className="card">
          <Task task={{name: "hi"}}/>
      </div>

    </>
  )
}

export default App
