import { useState } from 'react';
import { useEmployeesContext } from '../hooks/useEmployeesContext';

const EmployeeForm = () => {
  const { dispatch } = useEmployeesContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [tenure, setTenure] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      firstName,
      lastName,
      jobTitle,
      skills,
      technologies,
      tenure,
    };

    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(emptyFields);
      console.log("Didn't work");
    }

    if (response.ok) {
      setEmptyFields([]);
      setFirstName('');
      setLastName('');
      setJobTitle('');
      setSkills('');
      setTechnologies('');
      setTenure('');
      setError(null);
      console.log('New Employee Added', json);
      dispatch({ type: 'CREATE_EMPLOYEE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Employee</h3>

      <label>First Name</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        // if firstName is not in emptyFields, use error class, otherwise no class
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />

      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes('lastName') ? 'error' : ''}
      />

      <label>Job Title</label>
      <input
        type="text"
        onChange={(e) => setJobTitle(e.target.value)}
        value={jobTitle}
        className={emptyFields.includes('jobTitle') ? 'error' : ''}
      />

      <label>Skills</label>
      <input
        type="text"
        onChange={(e) => setSkills(e.target.value.split(','))}
        value={skills}
        className={emptyFields.includes('skills') ? 'error' : ''}
      />

      <label>Technologies</label>
      <input
        type="text"
        onChange={(e) => setTechnologies(e.target.value.split(','))}
        value={technologies}
        className={emptyFields.includes('technologies') ? 'error' : ''}
      />

      <label>Tenure</label>
      <input
        type="text"
        onChange={(e) => setTenure(e.target.value)}
        value={tenure}
        className={emptyFields.includes('tenure') ? 'error' : ''}
      />

      <button>Add Employee</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EmployeeForm;
