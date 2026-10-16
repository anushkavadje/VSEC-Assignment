import { useNavigate } from "react-router-dom";
import "./App.css";

function Input({
  setName,
  setCity,
  setAge,
  setMobile,
  setEmail,
  setCollege
}) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Enter Student Details</h2>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Enter Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <br /><br />

      <input
        type="tel"
        placeholder="Enter Mobile Number"
        onChange={(e) => setMobile(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Enter Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter College Name"
        onChange={(e) => setCollege(e.target.value)}
      />
      <br /><br />

      <button onClick={() => navigate("/display")}>
        Next
      </button>
    </div>
  );
}

export default Input;
