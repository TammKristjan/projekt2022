
import './MyProfile.css'
import {useState, useEffect} from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

function MyProfile() {

  const [user, loading] = useAuthState(auth);

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] =useState("");
  const [education, setEducation] =useState("");
  const [work, setWork] =useState("");
  const [interest, setInterest] =useState("");


  const fetchUserInfo = async () => {
    try {
      if(!user?.uid) return;
      const q = query(collection(db, 'profiles'), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setId(doc.docs[0].id);
      setName(data.name);
    } catch (err) {
      console.log(err);
      //alert("An error occured while fetching user data");
      }
    };

  const fetchProfileInfo = async () => {
    try {
      if(!user?.uid) return;
      const q = query(collection(db, 'profiles'), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setId(doc.docs[0].id);
      setName(data.name);
      setDescription(data.description);
      setEducation(data.education);
      setWork(data.work);
      setInterest(data.interest);
    } catch (err) {
      console.log(err);
      //alert("An error occured while fetching user data");
      }
    };

    if(name == "") fetchProfileInfo();

    const handleUpdate = async () => {
      try {
        if(!user?.uid) return;
        const q = query(collection(db, 'profiles'), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setId(doc.docs[0].id);
        setName(data.name);
        setDescription(data.description);
        setEducation(data.education);
        setWork(data.work);
        setInterest(data.interest);
          await updateDoc(doc.docs[0], {
            description: description,
            education: education,
            work: work,
            interest: interest,
          })
      } catch (err) {
        console.log(err);
        //alert("An error occured while fetching user data");
        }
      };

    /* function to update document in firestore */
  const handleUpdates = async (e) => {
    e.preventDefault()
    console.log(name)
    const taskDocRef = doc(db, 'profiles', id)
    try{
      await updateDoc(taskDocRef, {
        description: description,
        education: education,
        work: work,
        interest: interest,
      })
    } catch (err) {
      alert(err)
    }    
  }

  useEffect(() => {
    if (loading) return;
    //if (!user) return navigate("/");    -- viskas kogu aeg avalehele
    if (!user) return;

  }, [user, loading, name]);


  return (
    <>
    <form onSubmit={handleUpdate} className='updateUser' name='updateUser'>
    <div className='main-container'>
      <h1>Minu profiil</h1>

        <div className="first-name">
          <h3>Ees- ja perekonnanimi</h3>
          <input className="container-for-data-myprofile2" type="text" value={name}/>
        </div>

        <br/><h3>Kirjeldus</h3>
        <div>
          <textarea className="container-for-data-myprofile" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
     
        <br/><h3>Haridus</h3>
        <div>
          <textarea className="container-for-data-myprofile" type="text" value={education} onChange={(e) => setEducation(e.target.value)}/>
        </div>
        
        <br /><h3>Töökoht</h3><div>
          <textarea className="container-for-data-myprofile" type="text" value={work} onChange={(e) => setWork(e.target.value)}/>
        </div>

        <br /><h3>Huvid</h3><div>
          <textarea className="container-for-data-myprofile" type="text" value={interest} onChange={(e) => setInterest(e.target.value)}/>
        </div>
        <br/>
          <button className="btn-secondary" onClick={() => alert("Andmed salvestatud!")}>Salvesta</button>
          <button className="btn-secondary-cancel" onClick={() => navigate("../")} >Tühista</button>
          </div>
      </form>
    </>
  )
}

export default MyProfile