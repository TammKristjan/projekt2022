import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from './firebase'

function UserData({id, email, name, type, speciality, year}) {

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{type}</td>
      <td>{speciality}</td>
      <td>{year}</td>
    </tr>
  )
}

export default UserData