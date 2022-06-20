import Modal from "./Modal"
import './taskItem.css';

import React, {useState, useEffect} from 'react';
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

function AdminPortfolio({id, onClose, open, title, description, name, picture, speciality}) {

  const [state, setState] = useState(false);

  /* function to update document in firestore */
  const handleCheckedChange = async () => {
    const taskDocRef = doc(db, 'postitus', id)
    try{
      await updateDoc(taskDocRef, {
        status: state,
        completed: state,
      })
    } catch (err) {
      alert(err)
    }
  }

  const change = async () => {
    setState(true);
    setTimeout(onClose, 500)
  }

  useEffect(() => {
    handleCheckedChange();
  },[state]);

  return (
    <Modal onClose={onClose} open={open}>
      <div className='taskItem'>
        <img src={picture}></img>
        <h2>{title}</h2>
        <br></br>
        <h3>{speciality}</h3>
        <h3>{name}</h3>
        <div dangerouslySetInnerHTML={{__html: description}} />
      </div>
      <button 
      className='task__editButton' 
      onClick={() => {change()}}>
      AVALIKUSTA
    </button>
    <button 
      className='task__editButton' 
      onClick={() => {setState(false); handleCheckedChange()}}>
      LÜKKA TAOTLUS TAGASI
    </button>
    </Modal>
  )
}

export default AdminPortfolio
