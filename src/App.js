import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Homework',
      day: 'Jan 22 at 5:30pm',
      reminder: false
    },
    {
      id: 2,
      text: 'Watch anime',
      day: 'May 7 at 4:00am',
      reminder: true
    },
    {
      id: 3,
      text: 'Call Mom',
      day: 'Sept 13 at 8:00pm',
      reminder: true
    }
  ]);

  // Show add task
  const showAdd = () => {
    setShowAddTask(!showAddTask);
  }

  // Add a task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id
        ? {...task, reminder: !task.reminder}
        : task)
    );
  }

  return (
    <div className="App">
      <Header title='Task Tracker' onShow={showAdd} isShowAdd={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask} /> }
      { tasks.length > 0 ? 
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        : 'No tasks :)' }
    </div>
  );
}

export default App;
