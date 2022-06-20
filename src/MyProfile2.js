
import './MyProfile.css'
import {useState, useEffect} from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import AddTask from './AddTask';

function MyProfile2() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const [description, setOpenDescription] =useState(false);
  const [education, setOpenEducation] =useState(false);
  const [work, setOpenWork] =useState(false);
  const [interest, setOpenInterest] =useState(false);

  const [show, setShow] = useState(false);

  function openDescription(){
    console.log("description");
    document.getElementById("description").value=document.getElementById("description-text").innerText;
  }

  function openEducation(){
    console.log("education");
    document.getElementById("education").value=document.getElementById("education-text").innerText;
  }

  function openWork(){
    console.log("work");
    document.getElementById("work").value=document.getElementById("work-text").innerText;
  }

  function openInterest(){
    console.log("interest");
    document.getElementById("interest").value=document.getElementById("interest-text").innerText;
  }
  
  return (
    <div className="main-container">
      <h1>Minu profiil</h1>
        <div className="profile-description-box">
        <section>  
          <div className='profile'>
          <img src='https://d1icd6shlvmxi6.cloudfront.net/gsc/FALM6H/e6/a1/17/e6a1176de5c0493d99d37e7845bd0473/images/minu_profiil__1_/u9.jpg?pageId=d46bb45d-6ec8-408b-90d3-51a52c50714c'></img> 
          <p id="description-text">Siin on kasutaja lühikirjeldus</p>
          </div> 
          <button className="btn-change" onClick={()=> {setOpenDescription(true); setTimeout(()=>openDescription(), 500);}} >Muuda</button>   
          <span className="public">
            <input type="checkbox" id="checkbox-description" defaultChecked onclick="description-text.hidden=!this.checked" />
            <label>Avalik</label>
          </span>
      </section>
        {description &&
        <section>
          <h3>Muuda andmeid</h3>
          <textarea id="description" style={{width:"50%", height:"200px"}}></textarea><br />
          <button className='btn-save' onClick={() => {document.getElementById("description-text").innerText=document.getElementById("description").value; setOpenDescription(false);}}>Salvesta</button>
        </section>
          }
        </div>
      <h2>Haridus</h2>
      <div className="education-container">
      <section> 
          <div className='education'>
          <p id="education-text">keskkool</p>
          </div>
          <button className="btn-change" onClick={()=> {setOpenEducation(true); setTimeout(()=>openEducation(), 500);}} >Muuda</button>   
          <span className="public">
            <input type="checkbox" id="checkbox-education" defaultChecked onclick="education-text.hidden=!this.checked" />
            <label>Avalik</label>
          </span>
      </section>
        {education &&
        <section>
          <h3>Muuda andmeid</h3>
          <textarea id="education" style={{width:"50%", height:"200px"}}></textarea><br />
          <button className='btn-save'onClick={() => {document.getElementById("education-text").innerText=document.getElementById("education").value; setOpenEducation(false);}}>Salvesta</button>
        </section>
          }
      </div>

      <h2>Töökoht</h2>
      <div className='work-container'>
      <section>  
          <div className='work'>
          <p id="work-text">õpilane</p>
          </div>
          <button className="btn-change" onClick={()=> {setOpenWork(true); setTimeout(()=>openWork(), 500);}} >Muuda</button>   
          <span className="public">
            <input type="checkbox" id="checkbox-work" defaultChecked onclick="work-text.hidden=!this.checked" />
            <label>Avalik</label>
          </span>
      </section>
        {work &&
        <section>
          <h3>Muuda andmeid</h3>
          <textarea id="work" style={{width:"50%", height:"200px"}}></textarea><br />
          <button className='btn-save' onClick={() => {document.getElementById("work-text").innerText=document.getElementById("work").value; setOpenWork(false);}}>Salvesta</button>
        </section>
          }
      </div>
      
      <h2>Huvid</h2>
      <div className='interest-container'>
      <section>    
          <div className='interest'>
          <p id="interest-text">tantsimine</p>
          </div>
          <button className="btn-change" onClick={()=> {setOpenInterest(true); setTimeout(()=>openInterest(), 500);}} >Muuda</button>   
          <span className="public">
            <input type="checkbox" id="checkbox-interest" defaultChecked onclick="interest-text.hidden=!this.checked" />
            <label>Avalik</label>
          </span>
      </section>
        {interest &&
        <section>
          <h3>Muuda andmeid</h3>
          <textarea id="interest" style={{width:"50%", height:"200px"}}></textarea><br />
          <button className='btn-save' onClick={() => {document.getElementById("interest-text").innerText=document.getElementById("interest").value; setOpenInterest(false);}}>Salvesta</button>
        </section>
          }
      </div>
    </div>
  )
}

export default MyProfile2