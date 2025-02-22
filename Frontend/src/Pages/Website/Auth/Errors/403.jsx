import { Link } from "react-router-dom";
import "./403.css";

export default function Error403({role}) {
  return (
    <>
      
      <div className="ErrorContainer container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="message ">You are not authorized.</div>
        <div className="message2 text-center">
            You tried to access a page you did not have prior authorization for.
        </div>
        <Link to={role === '1996' ? 'editor' : '/'} className="btn btn-third mt-4">{role === '1996' ? 'Go To Editor Page' : 'Return To HomePage'}</Link>
      </div>
        <div className="d-flex flex-column align-items-center">
        <div className="neon">403</div>
        <div className="door-frame">
          <div className="door">
            <div className="rectangle"></div>
            <div className="handle"></div>
            <div className="window">
              <div className="eye"></div>
              <div className="eye eye2"></div>
              <div className="leaf"></div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </>
  );
}
