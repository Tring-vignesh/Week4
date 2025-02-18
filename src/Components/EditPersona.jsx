import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditPersona() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/signin");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === loggedInUser.email);
    if (user && user.personas && user.personas[index]) {
      setPersona(user.personas[index]);
    } else {
      setPersona({});
    }
  }, [index, navigate]);

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (field, value) => {
    setPersona({ ...persona, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = () => {
    if (previewImage) {
      setPersona((prevPersona) => {
        const updatedPersona = { ...prevPersona, image: previewImage };

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex((user) => user.email === loggedInUser?.email);

        if (userIndex !== -1) {
          users[userIndex].personas[index] = updatedPersona;
          localStorage.setItem("users", JSON.stringify(users));
        }

        return updatedPersona;
      });
    }
    setShowModal(false);
  };

  const handleUpdatePersona = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.email === loggedInUser?.email);

    if (userIndex !== -1) {
      users[userIndex].personas[index] = persona;
      localStorage.setItem("users", JSON.stringify(users));
     
      navigate("/dashboard");
    }
  };

  const handleDeletePersona = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.email === loggedInUser?.email);

    if (userIndex !== -1) {
      users[userIndex].personas.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      
      navigate("/dashboard");
    }
  };

  if (!persona) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg w-100 h-100 overflow-auto">
        <img
          src={persona.image}
          className="card-img-top"
          style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "cover" }}
          alt="Persona Background"
        />
        <div className="p-3">
          <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
            Change Image
          </button>
          <div className="mt-4 p-3 rounded">
            <h5 className="text-black">Persona Name</h5>
            <input
              type="text"
              className="form-control border-0 fw-bold fs-4 p-0"
              style={{ outline: "none", background: "transparent", boxShadow: "none" }}
              value={persona.name||"Unnamed"}
              onChange={(e) => setPersona({ ...persona, name: e.target.value })}
            />
          </div>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {[{ label: "Notable Quote", name: "quote" }, { label: "Description", name: "description" }, { label: "Attitudes / Motivations", name: "motivations" }]
              .map(({ label, name }) => (
                <div className="col-md-4" key={name}>
                  <label className="form-label fw-bold">{label}</label>
                  <textarea
                    className="form-control border-0"
                    name={name}
                    rows="5"
                    style={{ resize: "none", outline: "none", background: "transparent", boxShadow: "none" }}
                    value={persona[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
            {[{ label: "Pain Points", name: "painPoints" }, { label: "Jobs / Needs", name: "jobsNeeds" }, { label: "Activities", name: "activities" }]
              .map(({ label, name }) => (
                <div className="col-md-4" key={name}>
                  <label className="form-label fw-bold">{label}</label>
                  <ReactQuill theme="snow" value={persona[name]} onChange={(value) => handleQuillChange(name, value)}  style={{ height: "100px"  }} />
                </div>
              ))}
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between mt-5">
          <button className="btn btn-danger btn-lg" onClick={handleDeletePersona}>DELETE</button>
          <div>
            <button className="btn btn-success btn-lg me-2" onClick={handleUpdatePersona}>
              UPDATE
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate(-1)}>CLOSE</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Persona Image</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                {previewImage && <img src={previewImage} className="img-fluid mb-3" alt="Preview" />}
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleImageSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
