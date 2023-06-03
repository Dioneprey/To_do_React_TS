import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from './App.module.css'
import TaskForm from "./components/TaskForm";
import Tasklist from "./components/Tasklist";
import Modal from "./components/Modal";
import { useState } from "react";
import { ITask } from "./interfaces/Task";


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    )
  }

  const hideOrShowModal = ( display: boolean ) => {
    const modal = document.querySelector('#modal')
    display ? modal!.classList.remove("hide") : modal!.classList.add("hide")
  }

  const editTask = (task: ITask):void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false)
  }

  return (
    <div className="App">
      <Modal 
        children={
          <TaskForm 
            btnText="Editar tarefa"             
            task={taskToUpdate}
            taskList={taskList}
          />}
        />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm 
            taskList={taskList} 
            setTaskList={setTaskList}             
            handleUpdate={updateTask} 
            btnText="Criar tarefa" />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <Tasklist 
            handleEdit={editTask} 
            handleDelete={deleteTask} 
            taskList={taskList}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
