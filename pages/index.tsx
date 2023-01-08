import styles from '../styles/Home.module.css'
import SignUp from './components/SignUp'
// import {NewTodo} from './components/NewTodo'
// import { ToDoList } from './components/ToDoList'

export default function Home() {
  return (
    <div className={styles.container}>
      <SignUp/>
      {/* <NewTodo/>
      <ToDoList/> */}
    </div>
  )
}
