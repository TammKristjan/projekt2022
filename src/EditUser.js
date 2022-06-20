import Modal from "./Modal"
import {useState} from 'react'
import './EditUser.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase'

function EditUser({open, onClose, toEditName,toEditEmail, toEditType, toEditSpeciality, toEditYear, id}) {

  const [name, setName] = useState(toEditName)
  const [email, setEmail] = useState(toEditEmail)
  const [type, setType] = useState(toEditType)
  const [speciality, setSpeciality] = useState(toEditSpeciality)
  const [year, setYear] = useState(toEditYear)
  

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'users', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        email: email,
        type: type,
        speciality: speciality,
        year: year
      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }

  return (
    <Modal modalLable='Muuda kasutaja andmeid' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editUser' name='updateTask'>
        NIMI
        <input 
          type='text' 
          name='name'
          onChange={(e) => setName(e.target.value)} 
          value={name}/>
        EMAIL
          <input 
          type='text' 
          name='email'
          onChange={(e) => setEmail(e.target.value)} 
          value={email}/>
        TUDENG/TÖÖTAJA
          <input 
          type='text' 
          name='type'
          onChange={(e) => setType(e.target.value)} 
          value={type}/>
        ALA
        <input 
        type='text' 
        name='speciality'
        onChange={(e) => setSpeciality(e.target.value)} 
        value={speciality}/>
        AASTA
          <input 
          type='text' 
          name='year'
          onChange={(e) => setYear(e.target.value)} 
          value={year}/>
        <button type='submit'>Salvesta</button>
      </form> 
    </Modal>
  )
}

export default EditUser
