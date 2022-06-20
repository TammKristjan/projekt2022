import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from './firebase'

function Task({id, title, description, status, name, picture, speciality}) {

  const [checked, setChecked] = useState(status)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

   /* function to update document in firestore */
  const handleCheckedChange = async () => {
    const taskDocRef = doc(db, 'postitus', id)
    try{
      await updateDoc(taskDocRef, {
        status: checked
      })
    } catch (err) {
      alert(err)
    }
  }

    /* function to delete a document from firstore */
    
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'postitus', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }
  
  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div className='task__body'>
        <img src={picture}></img>
        <div className="text-area">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{__html: description}} />
        <br></br>
        <h3>{speciality}</h3>
        <h3>{name}</h3>
        {/* <h3>{name}</h3> */}
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Muuda
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Kustuta</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            Vaata
          </button>
        </div>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleCheckedChange}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} >Avalikusta</label>
      </div>
      </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view}
          name={name}
          picture={picture}
          />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task