import { useState } from 'react';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [tenure, setTenure] = useState('');
  const [error, setError] = useState('');

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
    }

    if (response.ok) {
      setFirstName('');
      setLastName('');
      setJobTitle('');
      setSkills('');
      setTechnologies('');
      setTenure('');
      setError(null);
      console.log('New Employee Added', json);
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
      />

      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Job Title</label>
      <input
        type="text"
        onChange={(e) => setJobTitle(e.target.value)}
        value={jobTitle}
      />

      <label>Skills</label>
      <input
        type="text"
        onChange={(e) => setSkills(e.target.value.split(','))}
        value={skills}
      />

      <label>Technologies</label>
      <input
        type="text"
        onChange={(e) => setTechnologies(e.target.value.split(','))}
        value={technologies}
      />

      <label>Tenure</label>
      <input
        type="text"
        onChange={(e) => setTenure(e.target.value)}
        value={tenure}
      />

      <button>Add Employee</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EmployeeForm;
