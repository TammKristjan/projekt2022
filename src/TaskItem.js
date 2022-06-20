import Modal from "./Modal";
import './taskItem.css';

function TaskItem({onClose, open, title, description, name, picture, speciality}) {

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
    </Modal>
  )
}

export default TaskItem
