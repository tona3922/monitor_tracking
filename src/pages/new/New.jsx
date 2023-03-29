import "./new.scss";
import { Link } from "react-router-dom";

const New = ({ inputs }) => {
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <form>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
            ))}
            <div className="formInput">
              <button>Send</button>
            </div>
          </form>
        </div>
        <div className="link">
          Already got an account : <Link to="/login"> Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default New;
