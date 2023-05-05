import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEmployeesContext } from '../hooks/useEmployeesContext';

const EditEmployee = ({ employee, id }) => {
  const { dispatch, employees } = useEmployeesContext();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    // for testing, remove later
    console.log(employee);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    // for testing, remove later

    console.log(employees);
  };

  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [jobTitle, setJobTitle] = useState(employee.jobTitle);
  const [skills, setSkills] = useState(employee.skills);
  const [technologies, setTechnologies] = useState(employee.technologies);
  const [tenure, setTenure] = useState(employee.tenure);
  const [error, setError] = useState('');
  const [modalEmptyFields, setModalEmptyFields] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedEmployee = {
      ...employee,
      firstName,
      lastName,
      jobTitle,
      skills,
      technologies,
      tenure,
    };
    // for testing, remove later

    console.log(updatedEmployee);
    console.log(employees);

    const response = await fetch('/api/employees/' + employee._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedEmployee),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    // for testing, remove later

    console.log(json);

    if (!response.ok) {
      setError(json.error);
      setModalEmptyFields(json.ModalEmptyFields);
      console.log("Didn't work");
    }

    if (response.ok) {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: json });
      handleClose();
    }
  };

  return (
    <div>
      <span
        variant="primary"
        onClick={handleShow}
        className="material-symbols-outlined"
      >
        edit
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="create" onSubmit={handleSave}>
            <label>First Name</label>
            <input
              required
              type="text"
              defaultValue={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <label>Last Name</label>
            <input
              required
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <label>Job Title</label>
            <input
              required
              type="text"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            />

            <label>Skills</label>
            <input
              required
              type="text"
              value={skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
            />

            <label>Technologies</label>
            <input
              required
              type="text"
              value={technologies}
              onChange={(e) => {
                setTechnologies(e.target.value);
              }}
            />

            <label>Tenure</label>
            <input
              required
              type="number"
              value={tenure}
              onChange={(e) => {
                setTenure(e.target.value);
              }}
            />
            {error && <div className="error">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditEmployee;
