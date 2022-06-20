import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posti aadress" />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Saada parooli muutmiseks e-kiri
        </button>

        <div>
          Ei ole kasutajat? <Link to="/register">Registreeru</Link> nüüd.
        </div>
      </div>
    </div>
  );
}

export default Reset;
