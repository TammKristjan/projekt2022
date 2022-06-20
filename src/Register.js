import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
import {db} from './firebase'
import {collection, addDoc } from 'firebase/firestore'


function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [type, setType] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [year, setYear] = useState("");

  const [status, setStatus] = React.useState(0) // 0: no show, 1: show yes, 2: show no.

  const navigate = useNavigate();

  const radioHandler = (status) => {
    setStatus(status);
  };

  /* function to add new profile to firestore */
  const createProfile = async () => {
    try {
      await addDoc(collection(db, 'profiles'), {
        name: name,
        description: "",
        education: "",
        work: "",
        interest: "",
      })
    } catch (err) {
      alert(err)
    }
  }

  const register = () => {
    if (!name) alert("Palun sisesta nimi")
    else if (!email) alert("Palun sisesta email");
    else if (!password) alert("Palun sisesta parool");
    else if (password != password2) alert("Paroolid ei ühti");
    else if (!type) alert("Palun sisesta roll");
    else if (!speciality) alert("Palun sisesta ala");
    else if (status === 1 && !year) alert("Palun sisesta aasta");
    else {registerWithEmailAndPassword(name, email, password, type, speciality, year)};
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("../");
  }, [user, loading]);

  return (
    <div className="register">
        <div className="register__container">
        <h1>Registreeru kasutajaks</h1>
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ees- ja perekonnanimi"/>

          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posti aadress"/>

          <input id="password1"
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parool"/>

          <input id="password2"
            type="password"
            className="register__textBox"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Parool uuesti"/>

          <div className="student-and-worker">
            <div onChange={(e) => setType(e.target.value)}>
              <input id="for-student" type="radio" value="student" name="TUDENG" checked={status === 1} onClick={(e) => radioHandler(1)}/> TUDENG
              <input id="for-worker" type="radio" value="worker" name="TÖÖTAJA" checked={status === 2} onClick={(e) => radioHandler(2)}/> TÖÖTAJA
            </div>
          </div>
            {status === 1?
              <div className="if-student">
              <select name="eriala" id="eriala" onChange={(e) => setSpeciality(e.target.value)}>
              <option value="" selected disabled>--- Vali eriala ---</option>
                <option value="informaatika">Informaatika</option>
                <option value="matemaatika">Matemaatika, majandusmatemaatika ja andmeanalüüs</option>
                <option value="infoteadus">Infoteadus</option>
                <option value="infoteadus">Avatud ühiskonna tehnoloogiad</option>
                <option value="infoteadus">Digitaalsed õpimängud</option>
                <option value="infoteadus">Haridustehnoloogia</option>
                <option value="infoteadus">Informaatikaõpetaja</option>
                <option value="infoteadus">Infotehnoloogia juhtimine</option>
                <option value="infoteadus">Inimese ja arvuti interaktsioon</option>
                <option value="infoteadus">Interaktsioonidisain</option>
                <option value="infoteadus">Matemaatikaõpetaja</option>
              </select>
            
              <select name="year" id="year" onChange={(e) => setYear(e.target.value)}>
                  <option value="" selected disabled>--- Vali aasta ---</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
              </select>
            </div>
            :status === 2?
              <div className="if-worker">
                <input
                type="text"
                className="register__textBox"
                placeholder="Amet"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
            :
            <div></div>
            }

          <button className="register__btn" onClick={register}>
            Registreeru
          </button>
          <button className="register__btn register__google" onClick={signInWithGoogle}>
            Registreeru Google´i kontoga
          </button>

          <div>
            Oled juba kasutaja? <Link to="/">Logi sisse</Link>.
          </div>
          
        </div>
    </div>
  );
}

export default Register;
