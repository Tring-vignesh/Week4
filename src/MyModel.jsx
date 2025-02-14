import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function MyModel({ show, modalClose, addDetail, data }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [skill, setSkill] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setAge(data.age || "");
            setSkill(data.skill || "");
            setDesignation(data.designation || "");
            setAddress(data.address || "");
        } else {
            setName("");
            setAge("");
            setSkill("");
            setDesignation("");
            setAddress("");
        }
    }, [data]);

    function handleSubmit() {
        if (!name.trim() || !age.trim() || !skill.trim() || !designation.trim() || !address.trim()) {
            alert("Fill all the fields!");
            return;
        }

        const detail = { name, age, skill, designation, address };
        addDetail(detail);
        
        modalClose();
    }

    return (
        <Modal size='lg' show={show} onHide={modalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data ? "Edit Details" : "Enter Details"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Name</label>
                <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Age</label>
                <input type="text" className="form-control mb-2" value={age} onChange={(e) => setAge(e.target.value)} />
                <label>Skill</label>
                <input type="text" className="form-control mb-2" value={skill} onChange={(e) => setSkill(e.target.value)} />
                <label>Designation</label>
                <input type="text" className="form-control mb-2" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                <label>Address</label>
                <input type="text" className="form-control mb-2" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {data ? "Update" : "Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModel;
