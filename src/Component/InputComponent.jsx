import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [college, setCollege] = useState("");
  const [details, setDetails] = useState([]);

  function addButton() {
    if (name.trim() !== "" && location.trim() !== "" && college.trim() !== "") {
      const detail = { id: Date.now(), name, location, college };
      setDetails([...details, detail]);
      console.log("hi");
      setName("");
      setLocation("");
      setCollege("");
    }
  }

  function removeDetail(id) {
    setDetails(details.filter((detail) => detail.id !== id));
  }

  return (
    <div className="input-container">
      <h2>Enter Your Details</h2>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your College"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />
      <button onClick={addButton}>➕ Add</button>

      
      <ul>
        {details.map((detail) => (
          <li key={detail.id}>
            <span>{detail.name} - {detail.location} - {detail.college}</span>
            <button onClick={() => removeDetail(detail.id)}>❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
