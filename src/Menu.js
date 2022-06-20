import './Menu.css';
import {useState, useEffect} from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword, signInWithGoogle } from "./firebase";

function Menu() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [hasFocus, setFocus] = useState(false);

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [asend, setAsend]= useState("eemale");

    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        }
      };

    useEffect(() => {
      if (loading) return;
      //if (!user) return navigate("/");    -- viskas kogu aeg avalehele
      if (!user) return;

      fetchUserName();
    }, [user, loading]);

    //show and hide dropdown list item on button click 
    function show_hide(){
      var click = document.getElementById("list-items");
      if (click.style.display == "block"){
        click.style.display = "none";
      } else {
        click.style.display = "block";
      }
    }

    function show() {  
      var click = document.getElementById("list-items");
        click.style.display ="block";
        console.log("SHOW")
        document.getElementById("list-items").focus()
      }
      
    function hide() {
      var click = document.getElementById("list-items");  
      if(asend==="eemale"){
        click.style.display ="none";
      }
    }

  return (
    <nav className="navbar navbar-light" >
      <div className="container-fluid">
        <div className="navbar-header">
         <a className="logo" href='/'></a>
        </div>
        <ul className="nav navbar-nav">
          <li><a href="/">Tudengiportaal</a></li>
          <li><a href="/portfolios">Portfooliod</a></li>
          <li><a href="/entrant">Sisseastujale</a></li>
          <li><a href="/contact">Kontakt</a></li>
          
        </ul>
        <ul className="nav navbar-nav navbar-right">
        <form className="navbar-form navbar-left" action="/action_page.php">
          {
          /*
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" name="search" />
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
          */
          }
          
        </form>
          {(user) ?
            <>
            
            <li>
              <a href="/myprofile">Minu profiil</a>
            </li>
            <li>
              <a href="/myportfolio">Minu portfoolio</a>
            </li>
            <li>
              <div className="dropdown" onBlur={() => hide()}>
                <button className="button" onClick={() => show_hide()}>{name}</button> {/*<button onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} class="button">{name}</button> style={{display: hasFocus ? "block" : "none"}}*/}
                <center>
                  <div id="list-items" onMouseOut={(e) => setAsend("eemale")} onMouseOver={(e) => setAsend("sisse")}>
                    <a href="/mydata"> Andmed </a>
                    <a href="/" onClick={logout}> Logi välja </a>
                  </div>
                </center>
              </div>
            </li>
            </>
          :
          <>
          <li>
            <div className="dropdown" onBlur={() => hide()}>
                <button className="button" onClick={() => show_hide()}>Logi sisse</button> {/* onFocus={() => show()} onBlur={() => hide()}*/}
                <center>
                  <div id="list-items" onMouseOut={(e) => setAsend("eemale")} onMouseOver={(e) => setAsend("sisse")}>
              
                    <div className="login__container">
                      <input id = "kala"
                        type="text"
                        className="login__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posti aadress"
                      />
                      <input
                        type="password"
                        className="login__textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Parool"
                      />
                      <button
                        className="login__btn"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                      >Logi sisse</button>
                      <button className="login__btn login__google" onClick={signInWithGoogle}>
                        Logi sisse Google'i kontoga
                      </button>
                      <div >
                        <Link to="/reset" onClick={() => show_hide()}>Unustasin salasõna</Link>  
                      </div>
                      <div className='register-now'>
                      <Link to="/register" onClick={() => show_hide()}>Ei ole kasutajat? Registreeru nüüd.</Link>
                      </div>
                    </div>
                  </div>
                </center>
              </div>
              
            </li>
            {/* <li><a onClick={() => setOpenAddModal(true)}><span className="glyphicon glyphicon-log-in"></span> Logi sisse </a></li> */}
            </>
          
        }
          
        </ul>
      </div>
    </nav>
  )
}

export default Menu
/*
<ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown no-arrow">
                        <Link to={'#'} className="nav-link dropdown-toggle" id="userDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user-circle fa-fw"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link to={'#'} className="dropdown-item">Settings</Link>
                            <Link to={'#'} className="dropdown-item">Activity Log</Link>
                            <div className="dropdown-divider"></div>
                            <Link to={'#'} onClick={this.handleClickLogout} className="dropdown-item" data-toggle="modal" data-target="#logoutModal">Logout</Link>
                        </div>
                    </li>
                </ul>
  */