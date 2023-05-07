import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEmployeesContext } from '../hooks/useEmployeesContext';

const EditEmployee = ({ employee }) => {
  const { dispatch, employees } = useEmployeesContext();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    // for testing, remove later
    console.log(employee);

    setShow(false);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setJobTitle(employee.jobTitle);
    setSkills(employee.skills);
    setTechnologies(employee.technologies);
    setTenure(employee.tenure);
    setError(null);
    setModalEmptyFields([]);
  };
  const handleShow = () => {
    setShow(true);
    // for testing, remove later

    console.log(employee);
  };
  // state holders
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [jobTitle, setJobTitle] = useState(employee.jobTitle);
  const [skills, setSkills] = useState(employee.skills);
  const [technologies, setTechnologies] = useState(employee.technologies);
  const [tenure, setTenure] = useState(employee.tenure);
  const [error, setError] = useState('');
  const [modalEmptyFields, setModalEmptyFields] = useState([]);

  // save button click
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
        className="material-symbols-outlined edit-button"
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
          <form className="modal-form edit" onSubmit={handleSave}>
            <label>First Name</label>
            <input
              type="text"
              defaultValue={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className={modalEmptyFields.includes('firstName') ? 'error' : ''}
            />

            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className={modalEmptyFields.includes('lastName') ? 'error' : ''}
            />

            <label>Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              className={modalEmptyFields.includes('jobTitle') ? 'error' : ''}
            />

            <label>Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value.split(','))}
              className={modalEmptyFields.includes('skills') ? 'error' : ''}
            />

            <label>Technologies</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => {
                setTechnologies(e.target.value.split(','));
              }}
              className={
                modalEmptyFields.includes('technologies') ? 'error' : ''
              }
            />

            <label>Tenure</label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => {
                setTenure(e.target.value);
              }}
              className={modalEmptyFields.includes('tenure') ? 'error' : ''}
            />
            {error && <div className="error">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="save-btn" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditEmployee;
