import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

function DisplayDetails({ details, handleDelete, handleEdit }) {
    return (
        <div className="container mt-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skill</th>
                        <th>Designation</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {details.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No details available</td>
                        </tr>
                    ) : (
                        details.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.name}</td>
                                <td>{detail.age}</td>
                                <td>{detail.skill}</td>
                                <td>{detail.designation}</td>
                                <td>{detail.address}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEdit(index)} className="me-2">Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default DisplayDetails;
