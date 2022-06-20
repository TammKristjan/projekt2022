import './Home.css';
import TaskPublic from './TaskPublic'
import { useNavigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"


function Home() {

  const [user, loading] = useAuthState(auth);
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate();

  
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    if (loading) return;
    const q = query(collection(db, 'postitus'), orderBy('created', 'desc'))
    const q2 = query(q, where("completed", "==", true), where("status", "==", true))
    onSnapshot(q2, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[user, loading]);

  return (
    <><div class="welcome-container">
        <div class="left-container ">
            <h1 id="heading1">Tere tulemast </h1>
            <h1 id="heading2">Digi tudengiportaali</h1>

            <p>Meie lehel saad luua enda portfoolio, kus saad muretult hoida oma õpingute jooksul loodud projekte ja jagada saavutusi.
                <br value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget arcu tortor. Sed rutrum ligula at aliquet laoreet. Vivamus id
                    enim velit. Integer porttitor, ex vel tempor viverra, mauris diam sagittis leo, sodales rhoncus lorem felis sed tellus."/>
            </p>

            <button class="btn-primary" onClick={() => navigate("/register")}>Registreeri kasutajaks</button>
            
            
        </div>

        <div class="right-container">
        </div>
      </div>
      <div class="look_other_portfolios_container">
              <h1 id="sub-heading">Vaata teiste portfoolioid</h1>

              <div class="four_portfolios">

              {tasks[0] != null &&
                <TaskPublic
                  completed={tasks[0].data.completed}
                  title={tasks[0].data.title} 
                  description={tasks[0].data.description}
                  name={tasks[0].data.name}
                  picture={tasks[0].data.picture}
                />
                }
              {tasks[1] != null &&
                <TaskPublic
                  completed={tasks[1].data.completed}
                  title={tasks[1].data.title} 
                  description={tasks[1].data.description}
                  name={tasks[1].data.name}
                  picture={tasks[1].data.picture}
                />
                }
                {tasks[2] != null &&
                <TaskPublic
                  completed={tasks[2].data.completed}
                  title={tasks[2].data.title} 
                  description={tasks[2].data.description}
                  name={tasks[2].data.name}
                />
                }

              </div>

              <button class="btn-secondary" onClick={() => navigate("/portfolios")}>Vaata veel portfoolioid</button>
          </div><div class="study-info">
              <h2 id="sub-heading">Oled huvitatud meie juurde õppima tulemises?</h2>{/*Siin lehel saad tutvuda instituudi õpilaste loodud projektidega */}
                <p> Siin saad tutvuda digiehnoloogiate instituudi tudengite projektidega --{'>'} </p>
              <button class="btn-secondary" onClick={() => navigate("/entrant")}>Vaata õppimise kohta siit</button>
          </div></>
  )
}

export default Home