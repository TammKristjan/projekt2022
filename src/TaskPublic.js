import './task.css';
import {useState} from 'react';
import TaskItem from './TaskItem';
import EditTask from './EditTask';
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from './firebase';

function Task({id, title, description, completed, name, picture, speciality}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
      </div>
      <div className='task__body'>
        <img src={picture}></img>
        <div class="text-area">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{__html: description}} />
        <h3>{name}</h3>
        <div className='task__buttons'>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            Vaata
          </button>
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
          speciality={speciality}
          picture={picture} />
      }
    </div>
  )
}

export default Task