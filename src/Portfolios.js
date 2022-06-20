import './Portfolios.css';
import TaskPublic from './TaskPublic';
import React, {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
import {db} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import {
    auth,
} from "./firebase";


function Portfolios() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const fetchPortfolios = async () => {
    try{
      const q = query(collection(db, 'postitus'), orderBy('created', 'desc'))
      const q2 = query(q, where("completed", "==", true), where("status", "==", true))
      onSnapshot(q2, (querySnapshot) => {
        setTasks(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    } catch (err){
      console.error(err);
      alert("An error occured while fetching portfolios");
    }
  }

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    if (loading) return;
    fetchPortfolios();
  },[user, loading]);

  return (
    <>
    <div class="main-container">
    <h1>Portfooliod</h1>
    <h2>Viimati lisatud avalik projekt</h2>
    <div class="recent-post">
    {tasks[0] != null &&
      <TaskPublic
        completed={tasks[0].data.completed}
        title={tasks[0].data.title} 
        description={tasks[0].data.description}
        name={tasks[0].data.name}
        speciality={tasks[0].data.speciality}
        picture={tasks[0].data.picture}
      />
      }

    </div>
    <h2>Avalikud projektid</h2>
    <div class="all-portfolios">
    {tasks.map((task) => (
          <TaskPublic
            completed={task.data.completed}
            title={task.data.title} 
            description={task.data.description}
            name={task.data.name}
            speciality={task.data.speciality}
            picture={task.data.picture}
          />
        ))}
    
    
    </div> 
    </div>  
    </>
  )
}

export default Portfolios