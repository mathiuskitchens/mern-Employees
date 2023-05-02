import SkillSet from '../components/SkillSet';
import TechSet from '../components/TechSet';
import { useEmployeesContext } from '../hooks/useEmployeesContext';

const EmployeeDetails = ({ employee }) => {
  // importing dispatch function from Context
  const { dispatch } = useEmployeesContext();

  const handleClick = async () => {
    const response = await fetch('/api/employees/' + employee._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: json });
    }
  };

  return (
    <div className="employee-details">
      <h2>
        {employee.firstName} {employee.lastName}, {employee.jobTitle}
      </h2>

      <div>
        <strong>Skills: </strong>
        <SkillSet employee={employee} />
        <strong>Technologies: </strong>
        <TechSet employee={employee} />

        <p>
          <strong>Tenure: </strong>
          {employee.tenure} years
        </p>
      </div>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default EmployeeDetails;
