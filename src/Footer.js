import React from "react";
import { useNavigate} from "react-router-dom";
import "./Footer.css";

function Footer() {

  const navigate = useNavigate();
  
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>DIGITEHNOLOOGIATE INSTITUUT</h4>
            <h1 className="list-unstyled">
              <li>Narva mnt 29, 10120 Tallinn</li>
              <li>(+372) 640 9421</li>
              <li>dti@tlu.ee</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col2">
            <ui className="list-unstyled">
              <li onClick={() => navigate("../portfolios")}>PORTFOOLIOD</li>
              <li onClick={() => navigate("../entrant")}>SISSEASTUJALE</li>
              <li onClick={() => navigate("../contact")}>KONTAKT</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} DTI Tudengiportaal <p className="project-infomation">Tundengiportaal on valminud Tallinna Ülikooli digitehnoloogiate instituudi tarkvaraarenduse praktika raames.</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;