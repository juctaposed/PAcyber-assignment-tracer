import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Follow @juctaposed on Twitter',
        day: 'Now',
        reminder: true,
    },
    {
        id: 2,
        text: 'Check out this portfolio: juctaposed.netlify.app',
        day: 'Now',
        reminder: true,
    },
    {
        id: 3,
        text: 'Build more React apps',
        day: 'October 17th at 3:00pm',
        reminder: false,
    },
  ])

  //Add Task
  const addTask = (task) => {
    //create an id for user -> remove once connected to Mongo/DB
    const id = Math.floor(Math.random() * 20000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
    console.log(task)
    console.log(id)
  }

  // Delete a Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    console.log('delete', id)
  }


  // Toggle Reminder on Double Click
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id 
        ? { ...task, reminder: !task.reminder } 
        : task
        ))
  }

  return (
    <div className="container">
      <Header 
        onAdd={()=> setShowAddTask(!showAddTask)}
        showAdd={showAddTask} />
      {/* ternary shortcut for no else statement - show/hide the ass task form */}
      {showAddTask && 
        <AddTask onAdd={addTask} 
        />}
      {tasks.length > 0 ? (
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
        />
      ) : ('No Tasks Available')}
    </div>
  );
}

export default App;
