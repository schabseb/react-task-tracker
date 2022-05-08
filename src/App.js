import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch tasks from server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();

    return data;
  };

  // Fetch task from server
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();

    return data;
  };

  // Show add task
  const showAdd = () => {
    setShowAddTask(!showAddTask);
  }

  // Add a task
  const addTask = async (task) => {
    const response = await fetch(
      'http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(task)
      }
    );
    const data = await response.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(
      `http://localhost:5000/tasks/${id}`,
      { method: 'DELETE' }
    );

    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedTask)
      }
    );

    const data = await response.json();

    setTasks(
      tasks.map((task) => 
        task.id === id
        ? {...task, reminder: data.reminder}
        : task)
    );
  }

  return (
    <Router>
      <div className="App">
        <Header title='Task Tracker' onShow={showAdd} isShowAdd={showAddTask} />
        <Routes>
          <Route path='/' exact element={
              <>
                { showAddTask && <AddTask onAdd={addTask} /> }
                  { tasks.length > 0 ? 
                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                  : 'No tasks :)' }
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
