import SkillSet from '../components/SkillSet';
import TechSet from '../components/TechSet';

const EmployeeDetails = ({ employee }) => {
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
    </div>
  );
};

export default EmployeeDetails;
