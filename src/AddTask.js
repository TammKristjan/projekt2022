import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './addTask.css'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import './texteditor.js'
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


import { useAuthState } from "react-firebase-hooks/auth";

import {auth, db, storage} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { query, getDocs, where, } from "firebase/firestore";

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [user, loading] = useAuthState(auth);

  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");

  const editorRef = useRef(null);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setSpeciality(data.speciality);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
      }
    };

  useEffect(() => {
    if (loading) return;
    //if (!user) return navigate("/");    -- viskas kogu aeg avalehele
    if (!user) return;
    
    fetchUserName();
  }, [user, loading, name, speciality]);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    fetchUserName()
    e.preventDefault()

    const file = e.target[0]?.files[0]

    if (!file){
      alert("Vali pilt!");
      return;
    }
     

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db, 'postitus'), {
          title: title,
          description: editorRef.current.getContent(),
          completed: false,
          status: false,
          name: name,
          speciality: speciality,
          picture: url,
          uid: user?.uid,
          created: Timestamp.now()
        })
        onClose()
      }
      )
     });
  }


  return (
    <Modal modalLable='Lisa portfoolio' onClose={onClose} open={open}>
    
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
      <p id="add-portfolio-text">Lisa postituse kaanepilt: </p>
      <input type="file" id="featured-pic" name="filename"  ></input>
        <input 
          type='tekst' 
          name='pealkiri' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Sisesta pealkiri'/>
          <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={<p>{description}</p>}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
          
          <p id="add-portfolio-text">Lisa postituse failid: </p>
          <input type="file" id="myFile" name="filename"></input>
        <button type='submit'>Salvesta</button>
      </form> 
    </Modal>
  )
}

export default AddTask
