import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Personalist from "./Personalist";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {    
      navigate("/signin"); 
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);
  return (
    <>
    <Personalist />
    </>
  );
}
