import './MyData.css'
import EditUser from './EditUser'

import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import { query, collection, onSnapshot } from "firebase/firestore";

function MyData() {

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");

    const [users, setUsers] = useState([])
    const [aktiivne, setAktiivne] = useState(0);

    const navigate = useNavigate();


    const [openAddModal, setOpenAddModal] = useState(false)

    /* function to update document in firestore */
    const handleUpdate = async (e) => {
      e.preventDefault()
      const usersDocRef = doc(db, 'users', user.id)
      try{
        await updateDoc(usersDocRef, {
          name: name,
        })
      } catch (err) {
        alert(err)
      }    
    }

    const fetchUserInfo = async () => {
      try {
        const q = query(collection(db, 'users'))
        onSnapshot(q, (querySnapshot) => {
          setUsers(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
      })
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
        }
      };
      
    useEffect(() => {
      if (loading) return;
      //if (!user) return navigate("/");    -- viskas kogu aeg avalehele
      if(user?.uid != "VyCuLLK5miTjCoQi2ZRfYowNp663"){
        navigate("../");
      }
      fetchUserInfo();
    }, [user, loading]);

  return (

    <div class="main-grid">
        
    <div class="grid-item loc-left">
        <button onClick={() => navigate("../admin")}>Avaldused</button>
            <button onClick={() => navigate("../adminusers")}>Kasutajate andmed</button>
        </div>

   
    <div class="grid-item loc-right">
        <h2> KASUTAJATE ANDMED</h2>
        <table>
        
        </table>
        <table>
            <tr>
              <th>JRK</th>
              <th>KASTUAJA AB ID</th>
              <th>NIMI</th>
              <th>EMAIL</th>
              <th>TUDENG/TÖÖTAJA</th>
              <th>ALA</th>
              <th>AASTA</th>
              
            </tr>
            
            {users.map((user, index) => (
            <tr>
              <td></td>
              <td>{user.id}</td>
              <td>{user.data.name}</td>
              <td>{user.data.email}</td>
              <td>{user.data.type}</td>
              <td>{user.data.speciality}</td>
              <td>{user.data.year}</td>
              <button 
                className='task__editButton' 
                onClick={() => {setAktiivne(index); setOpenAddModal(true)}}>
                Muuda
              </button>
              {openAddModal &&
                <EditUser onClose={() => setOpenAddModal(false)} open={openAddModal}
                  toEditName={users[aktiivne].data.name}
                  toEditEmail={users[aktiivne].data.email}
                  toEditType={users[aktiivne].data.type}
                  toEditSpeciality={users[aktiivne].data.speciality}
                  toEditYear={users[aktiivne].data.year}
                  id={users[aktiivne].id}/>
              }
            </tr>
          ))}
            
            
          </table>

    </div>
        
</div>
    
)
}

export default MyData