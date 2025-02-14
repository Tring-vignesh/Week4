import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModel from './MyModel';
import './App.css';
import { Button } from 'react-bootstrap';
import DisplayDetails from './DisplayDetails.jsx';

function App() {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);
  const [editData, setEditData] = useState(null);
  const clearDetails=()=>{
    localStorage.removeItem("details");
    setDetails([]);
  };
  useEffect(() => {
    const storedDetails = localStorage.getItem("details");
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    }
  }, []);
  useEffect(() => {
    if (details.length > 0) {
      localStorage.setItem("details", JSON.stringify(details));
    }
  }, [details]);
  const modalClose = () => setShow(false);
  const modalShow = () => {
    setEditData(null);
    setShow(true);
  };
  function handleDelete(index) {
    const newDetails = details.filter((_, id) => id !== index);
    setDetails(newDetails);
  }
  function handleEdit(index) {
    const oldDetail = { ...details[index], index };
    setEditData(oldDetail);
    setShow(true);
  }
  function addDetail(detail) {
    if (editData !== null) {
      const updatedDetails = details.map((item, id) =>
        id === editData.index ? detail : item
      );
      setDetails(updatedDetails);
    } else {
      setDetails([...details, detail]);
    }

    setEditData(null);
  }
  return (
    <>
      <div className="container mt-4">
        <Button variant="success" onClick={modalShow}>
          Add Details
        </Button>
        <Button variant="success" onClick={clearDetails} className="ms-3">
          Clear Details
        </Button>
      </div>
      <MyModel show={show} modalClose={modalClose} addDetail={addDetail} data={editData} />
      <DisplayDetails details={details} handleDelete={handleDelete} handleEdit={handleEdit} />
      
    </>
  );
}

export default App;
