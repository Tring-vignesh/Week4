import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonaCard from "./PersonaCard.jsx";
import { PlusCircle } from "lucide-react";

const Personalist = () => {
  const navigate = useNavigate();
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === loggedInUser.email);

      if (user && user.personas) {
        setPersonas(user.personas);
      }
    }
  }, []);

  const editPersona = (index) => {
    navigate(`/editpersona/${index}`); 
  };


  const addPersona = () => {
    
    navigate(`/editpersona/${personas.length}`);
  };

  return (
    <div className="d-flex flex-wrap gap-3 p-3">
      {personas.length === 0 ? (
        <p className="text-muted">No personas added yet.</p>
      ) : (
        personas.map((persona, index) => (
          <div key={index} onClick={() => editPersona(index)}>
            <PersonaCard
              name={persona.name || "Unnamed Persona"}
              image={persona.image || ""}
              lastUpdated={persona.lastUpdated || "Just now"}
            />
          </div>
        ))
      )}

      <div
        className="card d-flex align-items-center justify-content-center p-4"
        style={{ width: "18rem", cursor: "pointer" }}
        onClick={addPersona}
      >
        <PlusCircle size={40} />
        <p className="mt-2 text-secondary">Add a Persona</p>
      </div>
    </div>
  );
};

export default Personalist;
