import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
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
  ])

  return (
    <div className="App">
      <Header title='Task Tracker'/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
