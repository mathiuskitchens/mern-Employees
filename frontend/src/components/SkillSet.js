const SkillSet = ({ employee }) => {
  const employeeSkills = employee.skills;
  return (
    <ul>
      {employeeSkills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  );
};

export default SkillSet;
