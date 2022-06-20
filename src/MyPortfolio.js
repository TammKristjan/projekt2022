import './MyPortfolio.css';
import Task from './Task';
import AddTask from './AddTask';
import React, {useState, useEffect} from 'react';
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
import {db} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function MyPortfolio() {
  
  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    const q = query(collection(db, 'postitus'), orderBy('created', 'desc'))
    const q2 = query(q, where("uid", "==", user?.uid))
    onSnapshot(q2, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })

  },[user, loading]);

  return (
    <>
    <div className="main-content-box">
    <h1>Minu portfoolio</h1>
    <br></br>
    <button className='btn-secondary' onClick={() => setOpenAddModal(true)}>Lisa uus projekt</button>
    <h2>Viimati lisatud projekt</h2>
    <div className="recent-post">
    {tasks[0] != null &&
      <Task
        id={tasks[0].id}
        status={tasks[0].data.status}
        title={tasks[0].data.title} 
        description={tasks[0].data.description}
        name={tasks[0].data.name}
        speciality={tasks[0].data.speciality}
        picture={tasks[0].data.picture}
      />
      }
    </div>
    <h2>Minu projektid</h2>
    <div className="all-portfolios">
    {tasks.map((task) => (
          <Task
            id={task.id}
            key={task.id}
            status={task.data.status}
            completed={task.data.completed}
            title={task.data.title} 
            description={task.data.description}
            name={task.data.name}
            speciality={task.data.speciality}
            picture={task.data.picture}
          />
        ))}
    </div>
    {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
    }  
    </div>   
    </>
  )
}

export default MyPortfolio