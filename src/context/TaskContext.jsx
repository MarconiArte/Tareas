import {useState, createContext, useEffect} from 'react';
// import {tasks as data} from '../data/tasks';

export const TaskContext = createContext()
export function TaskContextProvider(props) {

  const [tasks, setTasks] = useState([]);
  const [montado, setMontado] = useState(false);

  //Montar las tareas al local
  useEffect(() =>{
      let dataLocal = localStorage.getItem('tarea')
         if(dataLocal != null){
           setTasks(JSON.parse(dataLocal))
         }
        setMontado(true)
         
  }, [])


  useEffect(()=> {

    if (montado == true){
      localStorage.setItem('tarea', JSON.stringify(tasks))
    }
  
   },[tasks])

  function createTask(task){
    setTasks([...tasks, {
      title: task.title,
      id:tasks.length,
      descripcion:task.descripcion
    }])
  }

  function deleteTask(taskId){
    setTasks(tasks.filter(task => task.id !== taskId))
    //localStorage.setItem('terea', JSON.stringify(tasks))
  }

  return (
      <TaskContext.Provider value={{
        tasks,
        deleteTask,
        createTask
      }}>
        {props.children}
      </TaskContext.Provider>
  )
}
