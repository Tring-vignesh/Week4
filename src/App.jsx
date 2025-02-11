import { useState } from "react";
import "./App.css";

function App() {
  const [isSubmit,setIsSubmit]=useState(false)
  const [details, setDetails] = useState([
    { name: "", location: "", college: "" },
  ]);

  function addButton() {
    const lastIndex = details.length - 1;

    if (details[lastIndex].name.trim() !== "" && details[lastIndex].location.trim() !== "" && details[lastIndex].college.trim() !== "") {
      setDetails([...details, { name: "", location: "", college: "" }]);
    }
    else {
      alert("Please fill out")
    }
  }
  

  function removeDetail(id) {
    setDetails(details.filter((detail, index) => index !== id));
  }


  function handleChange(id, field, value) {
    setDetails(
      details.map((detail, index) =>
        index == id ? { ...detail, [field]: value } : detail
      )
    );
  }

 function handleSubmit()
 {
  setIsSubmit(true);
  document.querySelector(".details-output").style.display="block";
  document.querySelector(".input-container").style.display="none";
 }
  return (
    <>
    <div className="input-container">
      {!isSubmit&&(<>
      <h2>Enter Your Details< /h2>
        {details.map((detail, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={detail.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Your Location"
              value={detail.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Your College"
              value={detail.college}
              onChange={(e) => handleChange(index, "college", e.target.value)}
            />
            <button className="add-btn" onClick={addButton}>+ </button>
            {details.length > 1 && (
              <button className="remove-btn" onClick={() => removeDetail(index)}>
                -
              </button>
            )}
          </div>
        ))}
      <button onClick={()=>{handleSubmit()}}>Submit</button>
      </>)}
     
    </div>
    <div className="details-output ">
      <h2>View Details</h2>
    {isSubmit&&details.map((detail,index)=>(
       <p className="details-item" key={index}>{index+1}.Name: {detail.name}  Location: {detail.location}  College: {detail.college}</p>
      
    ))}
    
    </div>
    </>
  );
}

export default App;
