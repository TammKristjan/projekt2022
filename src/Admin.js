import './Admin.css';
import AdminPortfolio from './AdminPortfolio';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import React, {useState, useEffect} from 'react';
import { auth, db } from "./firebase";

import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";


function Admin() {

  const [user, loading] = useAuthState(auth);

  const [tasks, setTasks] = useState([])

  const [open, setOpen] = useState({edit:false, view:false})

  const [aktiivne, setAktiivne] = useState(0);

  const [state, setState] = useState(true);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  const fetchPortfolios = async () => {
    try{
      const q = query(collection(db, 'postitus'), orderBy('created', 'desc'))
      const q2 = query(q, where("completed", "==", state))
      onSnapshot(q2, (querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          setTasks(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        } else {
          setTasks([])
        }
      })
    } catch (err){
      console.error(err);
      alert("An error occured while fetching portfolios");
    }
  }

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    if (loading) return;
    if(user?.uid != "VyCuLLK5miTjCoQi2ZRfYowNp663"){
      navigate("../");
    }
    fetchPortfolios();
  },[user, loading, state]);

  return (
    <div class="main-grid">
        <div class="grid-item loc-left">
          <button onClick={() => navigate("../admin")}>Avaldused</button>
          <button onClick={() => navigate("../adminusers")}>Kasutajate andmed</button>
        </div>


        <div class="grid-item loc-right">
            <h2> AVALDUSED</h2>
            <div id="confirmed-placement">
                <a onClick={() => setState(true)}>KINNITATUD</a><p>/</p><a onClick={() => setState(false)}>KINNITAMATA</a>
            </div>

            {/*Tabeli väljad: JRK /  POSTFOOLIO LINK /  KASUTAJA / (ERIALA)  / KUUPÄEV / AVALDUSE OLEK*/}
            {/*AVALDUSE OLEK -> (kinnitatud/ tühistatud/ kinnitamata) */}
            

            <table>
                <tr>
                  <th>JRK</th>
                  <th>PROJEKTI AB ID</th>
                  <th>NIMI</th>
                  <th>KUUPÄEV</th>
                  <th>AVALDUSE OLEK</th>
                </tr>
                
                {tasks.map((task, index) => (
                  <tr>
                  <td></td>
                  <td>{task.id}</td>
                  <td>{task.data.name}</td>
                  <td>{new Date(task.data.created.seconds*1000).toString().substring(0, 24)}</td>
                  <td>{task.data.completed.toString()}</td>
                  <button 
                    className='task__editButton' 
                    onClick={() => {setAktiivne(index); setOpen({...open, view: true})}}>
                    VAATA PORTFOOLIOT
                  </button>
                  </tr>
              ))}
              {open.view && tasks.length > 0 &&
                    <AdminPortfolio
                      onClose={handleClose}
                      title={tasks[aktiivne].data.title} 
                      description={tasks[aktiivne].data.description} 
                      open={open.view}
                      name={tasks[aktiivne].data.name}
                      speciality={tasks[aktiivne].data.speciality}
                      picture={tasks[aktiivne].data.picture}
                      completed={tasks[aktiivne].data.completed}
                      id={tasks[aktiivne].id}
                      />
                  }
              </table>

        </div>
      </div>
  )
}

export default Admin