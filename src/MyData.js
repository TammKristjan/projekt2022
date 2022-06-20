import './MyData.css'

import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc } from "firebase/firestore";

function MyData() {

    const [user, loading] = useAuthState(auth);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");

    const navigate = useNavigate();

    const [status, setStatus] = React.useState(0) // 0: no show, 1: show yes, 2: show no.

    const radioHandler = (status) => {
      setStatus(status);
    };

    const [open, setOpen] = useState({edit:false})
    const handleClose = () => {
      setOpen({edit:false})
    }
    

    const fetchUserInfo = async () => {
      try {
        if(!user?.uid) return;
        const q = query(collection(db, 'users'), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setId(doc.docs[0].id);
        setName(data.name);
        setEmail(data.email);
        setEmail2(data.email2);
        setSpeciality(data.speciality);
        setYear(data.year);
        setType(data.type);
      } catch (err) {
        console.log(err);
        //alert("An error occured while fetching user data");
        }
      };

      if(name == "") fetchUserInfo();

      /* function to update document in firestore */
    const handleUpdate = async (e) => {
      e.preventDefault()
      const taskDocRef = doc(db, 'users', id)
      try{
        await updateDoc(taskDocRef, {
          name: name,
          email: email,
          email2: email2,
          type: type,
          speciality: speciality,
          year: year,
        })
        handleClose()
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
      <h1>Minu andmed</h1><div id="start-flex">
        <div className="first-name">
          <h3>Ees- ja perekonnanimi</h3>
          <input className="container-for-data" type="text" value={name}/>
        </div>
     
        </div><br /><h3>Emaili aadress 1</h3><div>
          <input className="container-for-data" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div><br /><h3>Emaili aadress 2</h3><div>
          <input className="container-for-data" type="text" value={email2} onChange={(e) => setEmail2(e.target.value)}/>
        </div>
        <br />
        {type=="student"?
          <>
            <h3>TUDENG</h3>
            <div id="start-flex">
              <div className="student-box">
                <h3>Eriala</h3>
                <input className="container-for-data" type="text" value={speciality} onChange={(e) => setSpeciality(e.target.value)}/>
              </div>

              <div className="student-year-box">
                <h3>Õpingute alguse aasta</h3>
                <input className="container-for-data2" type="text" value={year} onChange={(e) => setYear(e.target.value)}/>
              </div>
            </div>
            <br />
          </>
        : type=="worker"?
          <>
            <h3>TÖÖTAJA</h3>
            <div id="work">
              <h3>Amet</h3>
              <input className="container-for-data" type="text" value={speciality} onChange={(e) => setYear(e.target.value)}/>
            </div>
          </>
        :
        <div className="student-and-worker">
            <div onChange={(e) => {setType(e.target.value)}}>
              <input id="for-student" type="radio" value="student" name="TUDENG" checked={status === 1} onClick={(e) => radioHandler(1)}/> TUDENG
              <input id="for-worker" type="radio" value="worker" name="TÖÖTAJA" checked={status === 2} onClick={(e) => radioHandler(2)}/> TÖÖTAJA
            </div>
          </div>
        }
          <button className="btn-secondary" onClick={() => alert("Andmed salvestatud!")}>Salvesta</button>
          <button className="btn-secondary-cancel" onClick={() => navigate("../")} >Tühista</button>
          </div>
        </form>
      </>
      
    
)
}

export default MyData