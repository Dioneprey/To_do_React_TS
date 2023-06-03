import { ITask } from "../interfaces/Task"
import styles from './TaskList.module.css'

interface Props {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
}

const Tasklist = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
            </div>
            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={() => handleEdit(task)}/>
              <i
                onClick={() => handleDelete(task.id)}
                className="bi bi-trash" />
            </div>
          </div>
        ))
      ) : (
        <p>Não tem tarefas cadastradas</p>
      )}
    </>
  )
}

export default Tasklist